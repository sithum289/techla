import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { STORE_CATEGORIES } from '../constants/categories';
import QuotationModal from './QuotationModal';
import { compressAndOptimizeImage } from '../utils/imageOptimizer';

export default function AdminDashboard() {
  const { user, token, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders' | 'quotation' | 'settings'
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');

  // Admin Custom Quotation Builder State
  const [quoteItems, setQuoteItems] = useState([]);
  const [quoteCustomerName, setQuoteCustomerName] = useState('');
  const [quoteCompanyName, setQuoteCompanyName] = useState('');
  const [quotePhone, setQuotePhone] = useState('');
  const [quoteEmail, setQuoteEmail] = useState('');
  const [quoteAddress, setQuoteAddress] = useState('');
  const [quoteCustomDiscount, setQuoteCustomDiscount] = useState(0);
  const [selectedProductToAdd, setSelectedProductToAdd] = useState('');
  const [customItemTitle, setCustomItemTitle] = useState('');
  const [customItemPrice, setCustomItemPrice] = useState('');
  const [customItemQty, setCustomItemQty] = useState(1);
  const [customItemWarranty, setCustomItemWarranty] = useState('1 Year Agent Warranty');
  const [isAdminQuotationModalOpen, setIsAdminQuotationModalOpen] = useState(false);

  // New Product Form State
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [compressingImage, setCompressingImage] = useState(false);
  const [imageCompressionInfo, setImageCompressionInfo] = useState(null);

  // Settings & Security State
  const [siteSettings, setSiteSettings] = useState({
    hotlinePhone: '+94 77 123 4567',
    whatsappNumber: '94771234567',
    storeEmail: 'sales@techla.lk',
    noticeBanner: 'Island-wide Cash on Delivery | Direct Authorized Agent Barcode Warranty | Showroom Pickup Available',
    showroomAddress: 'Colombo, Sri Lanka',
  });
  const [settingsMsg, setSettingsMsg] = useState('');
  const [settingsLoading, setSettingsLoading] = useState(false);

  // Change Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState({ type: '', text: '' });
  const [passwordLoading, setPasswordLoading] = useState(false);

  const initialForm = {
    title: '',
    category: STORE_CATEGORIES[0].id,
    brand: '',
    price: '',
    originalPrice: '',
    discount: '',
    stock: 10,
    inStock: true,
    condition: 'Brand New (Official Warranty)',
    image: '',
    imagesInput: '',
    description: '',
    featured: false,
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate('/');
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (token && isAdmin) {
      fetchOrders();
      fetchProducts();
      fetchSettings();
    }
  }, [token, isAdmin]);

  const fetchOrders = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/settings');
      if (res.ok) {
        const data = await res.json();
        if (data) setSiteSettings(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleStock = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}/toggle-stock`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const imagesArr = formData.imagesInput
        ? formData.imagesInput.split(/[\n,]+/).map((s) => s.trim()).filter(Boolean)
        : [];
      if (formData.image && !imagesArr.includes(formData.image)) {
        imagesArr.unshift(formData.image);
      }

      const payload = {
        title: formData.title,
        category: formData.category,
        brand: formData.brand,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
        discount: formData.discount ? Number(formData.discount) : null,
        stock: Number(formData.stock) || 0,
        inStock: formData.inStock,
        condition: formData.condition,
        image: formData.image || (imagesArr.length > 0 ? imagesArr[0] : ''),
        images: imagesArr,
        description: formData.description,
        featured: formData.featured,
      };

      const url = editingProduct
        ? `http://localhost:5000/api/products/${editingProduct.id}`
        : 'http://localhost:5000/api/products';
      const method = editingProduct ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setShowAddProduct(false);
        setEditingProduct(null);
        setFormData(initialForm);
        fetchProducts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = (p) => {
    setEditingProduct(p);
    setFormData({
      title: p.title,
      category: p.category,
      brand: p.brand || '',
      price: p.price,
      originalPrice: p.originalPrice || '',
      discount: p.discount || '',
      stock: p.stock,
      inStock: p.inStock,
      condition: p.condition || 'Brand New (Official Warranty)',
      image: p.image || '',
      imagesInput: p.images ? p.images.join('\n') : '',
      description: p.description || '',
      featured: p.featured || false,
    });
    setShowAddProduct(true);
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Delete this product from store?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  // Save Site Settings
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSettingsLoading(true);
    setSettingsMsg('');
    try {
      const res = await fetch('http://localhost:5000/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(siteSettings),
      });
      const data = await res.json();
      if (res.ok) {
        setSettingsMsg('✅ Settings updated successfully!');
      } else {
        setSettingsMsg(`❌ ${data.error || 'Failed to update settings'}`);
      }
    } catch (err) {
      setSettingsMsg('❌ Network error updating settings');
    } finally {
      setSettingsLoading(false);
    }
  };

  // Change Admin Password
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordMsg({ type: '', text: '' });
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'New password and confirm password do not match!' });
      return;
    }
    setPasswordLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setPasswordMsg({ type: 'success', text: '✅ Password changed successfully!' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPasswordMsg({ type: 'error', text: data.error || 'Failed to change password' });
      }
    } catch (err) {
      setPasswordMsg({ type: 'error', text: 'Failed to update password' });
    } finally {
      setPasswordLoading(false);
    }
  };

  const filteredProducts = selectedCategoryFilter === 'All'
    ? products
    : products.filter((p) => p.category === selectedCategoryFilter);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-techla-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050813] text-slate-900 dark:text-slate-100 font-sans pb-16">
      {/* Mobile-Friendly Top Navigation */}
      <div className="bg-white dark:bg-[#071126] border-b border-slate-200 dark:border-white/10 sticky top-0 z-40 px-4 sm:px-6 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/"
              className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <i className="fa-solid fa-arrow-left text-[11px]" />
              <span className="hidden sm:inline">Store</span>
            </Link>
            <div className="h-4 w-px bg-slate-200 dark:border-white/10" />
            <h1 className="text-base sm:text-lg font-black font-heading tracking-wide flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Techla Admin Suite</span>
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-lg">
              {user?.email?.split('@')[0]}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5 sm:mt-8">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#071126] border border-slate-200 dark:border-white/10 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Total Items</p>
              <h3 className="text-xl sm:text-2xl font-black mt-0.5 font-tech">{products.length}</h3>
            </div>
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center text-sm">
              <i className="fa-solid fa-boxes-stacked" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#071126] border border-slate-200 dark:border-white/10 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">In Stock</p>
              <h3 className="text-xl sm:text-2xl font-black mt-0.5 font-tech text-emerald-500">
                {products.filter((p) => p.inStock).length}
              </h3>
            </div>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-sm">
              <i className="fa-solid fa-circle-check" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#071126] border border-slate-200 dark:border-white/10 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Sold Out</p>
              <h3 className="text-xl sm:text-2xl font-black mt-0.5 font-tech text-rose-500">
                {products.filter((p) => !p.inStock).length}
              </h3>
            </div>
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center text-sm">
              <i className="fa-solid fa-circle-xmark" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#071126] border border-slate-200 dark:border-white/10 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Orders</p>
              <h3 className="text-xl sm:text-2xl font-black mt-0.5 font-tech text-amber-500">
                {orders.length}
              </h3>
            </div>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center text-sm">
              <i className="fa-solid fa-receipt" />
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-white/10 pb-4 mb-5">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'products'
                  ? 'bg-techla-600 text-white shadow-md shadow-techla-500/20'
                  : 'bg-white dark:bg-[#071126] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10'
              }`}
            >
              <i className="fa-solid fa-layer-group" />
              <span>Products ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'orders'
                  ? 'bg-techla-600 text-white shadow-md shadow-techla-500/20'
                  : 'bg-white dark:bg-[#071126] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10'
              }`}
            >
              <i className="fa-solid fa-bag-shopping" />
              <span>Orders ({orders.length})</span>
            </button>

            {/* SENSE.LK STYLE QUOTATION GENERATOR TAB */}
            <button
              onClick={() => setActiveTab('quotation')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'quotation'
                  ? 'bg-techla-600 text-white shadow-md shadow-techla-500/20'
                  : 'bg-white dark:bg-[#071126] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10'
              }`}
            >
              <i className="fa-solid fa-file-invoice" />
              <span>Quotation Builder</span>
            </button>

            {/* NEW SETTINGS & SECURITY TAB */}
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'settings'
                  ? 'bg-techla-600 text-white shadow-md shadow-techla-500/20'
                  : 'bg-white dark:bg-[#071126] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10'
              }`}
            >
              <i className="fa-solid fa-gear" />
              <span>Settings & Password</span>
            </button>
          </div>

          {activeTab === 'products' && (
            <button
              onClick={() => {
                setEditingProduct(null);
                setFormData(initialForm);
                setShowAddProduct(!showAddProduct);
              }}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-techla-600 to-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-techla-500/25 active:scale-95 transition-all"
            >
              <i className={`fa-solid ${showAddProduct ? 'fa-xmark' : 'fa-plus'}`} />
              <span>{showAddProduct ? 'Close Form' : '+ Add Item (Appliances, Phones, etc.)'}</span>
            </button>
          )}
        </div>

        {/* ==================== TAB 1: PRODUCTS ==================== */}
        {activeTab === 'products' && (
          <div className="space-y-5">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
              <button
                onClick={() => setSelectedCategoryFilter('All')}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                  selectedCategoryFilter === 'All'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10'
                }`}
              >
                All ({products.length})
              </button>
              {STORE_CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategoryFilter(c.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    selectedCategoryFilter === c.id
                      ? 'bg-techla-600 text-white shadow-sm'
                      : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10'
                  }`}
                >
                  <i className={`fa-solid ${c.icon} text-[10px]`} />
                  <span>{c.shortName || c.name}</span>
                </button>
              ))}
            </div>

            {/* Add / Edit Form */}
            {showAddProduct && (
              <form
                onSubmit={handleFormSubmit}
                className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-[#071126] border-2 border-techla-500/40 shadow-2xl space-y-4 animate-in fade-in"
              >
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
                  <h3 className="text-base font-black text-slate-900 dark:text-white font-heading">
                    {editingProduct ? 'Edit Product Item' : 'Add Item to Store Catalog'}
                  </h3>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-techla-50 dark:bg-techla-500/20 text-techla-600 dark:text-cyan-400">
                    {formData.category}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
                  <div className="sm:col-span-2">
                    <label className="block font-bold uppercase tracking-wider mb-1">Product Name / Model *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Singer Inverter Refrigerator 240L / Samsung S24"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase tracking-wider mb-1">Brand</label>
                    <input
                      type="text"
                      placeholder="Singer, LG, Samsung, Panasonic, Philips..."
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase tracking-wider mb-1">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 font-semibold"
                    >
                      {STORE_CATEGORIES.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold uppercase tracking-wider mb-1 text-slate-500">Regular Price (LKR)</label>
                    <input
                      type="number"
                      placeholder="e.g. 185000"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase tracking-wider mb-1 text-emerald-600 dark:text-emerald-400">Offer Price (LKR) *</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 165000"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border-2 border-emerald-500/40 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase tracking-wider mb-1">Stock Availability *</label>
                    <select
                      value={formData.inStock ? 'true' : 'false'}
                      onChange={(e) => setFormData({ ...formData, inStock: e.target.value === 'true' })}
                      className={`w-full px-3.5 py-2 rounded-xl border font-bold ${
                        formData.inStock
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                          : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30'
                      }`}
                    >
                      <option value="true">✅ In Stock</option>
                      <option value="false">❌ Sold Out</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold uppercase tracking-wider mb-1">Warranty</label>
                    <input
                      type="text"
                      placeholder="e.g. 10 Years Compressor / 2 Years Company Warranty"
                      value={formData.condition}
                      onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10"
                    />
                  </div>
                </div>

                {/* SMART COMPRESSED IMAGE UPLOAD + URL INPUT */}
                <div className="space-y-3 p-4 rounded-2xl bg-slate-100/70 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <i className="fa-solid fa-file-zipper text-techla-500" />
                      <span>Product Cover Image (Auto-Compress to WebP) *</span>
                    </label>
                    <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      ⚡ 5MB Photos auto-shrink down to &lt;90KB
                    </span>
                  </div>

                  {/* File Upload with Auto WebP Compressor */}
                  <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                    <label className="cursor-pointer px-4 py-2.5 rounded-xl bg-techla-600 hover:bg-techla-500 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all active:scale-95 shrink-0">
                      <i className="fa-solid fa-upload" />
                      <span>{compressingImage ? 'Optimizing & Compressing...' : 'Upload Image from Device'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={compressingImage}
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          setCompressingImage(true);
                          try {
                            const result = await compressAndOptimizeImage(file);
                            setFormData((prev) => ({
                              ...prev,
                              image: result.dataUrl,
                            }));
                            setImageCompressionInfo(result);
                          } catch (err) {
                            alert('Failed to compress image: ' + err.message);
                          } finally {
                            setCompressingImage(false);
                          }
                        }}
                      />
                    </label>

                    <span className="text-xs text-slate-400 font-semibold">OR enter external Image URL below:</span>
                  </div>

                  {/* Compression Stats Feedback */}
                  {imageCompressionInfo && (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-circle-check text-sm" />
                        <span>
                          <strong>Optimized:</strong> {imageCompressionInfo.originalSizeKB} KB → <strong>{imageCompressionInfo.compressedSizeKB} KB</strong> ({imageCompressionInfo.savings}% Size Reduction!)
                        </span>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500 text-white px-2 py-0.5 rounded">
                        Next-Gen WebP
                      </span>
                    </div>
                  )}

                  {/* Image URL Input & Preview */}
                  <div className="flex gap-3 items-center">
                    <input
                      type="text"
                      required
                      placeholder="https://... or auto-filled upon uploading file"
                      value={formData.image}
                      onChange={(e) => {
                        setFormData({ ...formData, image: e.target.value });
                        setImageCompressionInfo(null);
                      }}
                      className="flex-1 px-3.5 py-2 rounded-xl bg-white dark:bg-[#071126] border border-slate-200 dark:border-white/10 text-xs"
                    />

                    {formData.image && (
                      <div className="w-12 h-12 rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden bg-white shrink-0 p-1">
                        <img src={formData.image} alt="Preview" className="w-full h-full object-contain" />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1">Additional Gallery Images</label>
                  <textarea
                    rows={2}
                    placeholder="https://...&#10;https://..."
                    value={formData.imagesInput}
                    onChange={(e) => setFormData({ ...formData, imagesInput: e.target.value })}
                    className="w-full px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Capacity 240L, No Frost, Inverter Technology..."
                    className="w-full px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-techla-600 to-blue-600 text-white font-bold text-xs shadow-md"
                  >
                    {editingProduct ? 'Save Changes' : 'Publish Product'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddProduct(false);
                      setEditingProduct(null);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300 font-bold text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Product Cards Grid with Sales / Popularity count */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
              {filteredProducts.map((p) => {
                const discountPct = p.discount || (p.originalPrice && p.originalPrice > p.price
                  ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
                  : null);

                return (
                  <div
                    key={p.id}
                    className="group rounded-2xl bg-white dark:bg-[#071126] border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-video sm:aspect-square w-full bg-slate-100 dark:bg-white/5 overflow-hidden flex items-center justify-center p-3">
                        {p.image ? (
                          <img src={p.image} alt={p.title} className="w-full h-full object-contain" />
                        ) : (
                          <i className="fa-solid fa-box text-3xl text-slate-400" />
                        )}

                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                          <span
                            className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider shadow ${
                              p.inStock ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                            }`}
                          >
                            {p.inStock ? 'In Stock' : 'Sold Out'}
                          </span>

                          {p.salesCount > 0 && (
                            <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-purple-600 text-white shadow">
                              🔥 {p.salesCount} Sold
                            </span>
                          )}

                          {discountPct && (
                            <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 shadow">
                              {discountPct}% OFF
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="p-3.5 space-y-1.5">
                        <div className="flex items-center justify-between text-[10px] text-slate-400">
                          <span className="font-bold text-techla-600 dark:text-cyan-400 uppercase tracking-wider truncate max-w-[150px]">
                            {p.category}
                          </span>
                          {p.brand && <span className="font-semibold">{p.brand}</span>}
                        </div>

                        <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-2">
                          {p.title}
                        </h4>

                        <div className="flex items-baseline gap-2 pt-0.5">
                          <span className="font-tech text-sm sm:text-base font-black text-slate-900 dark:text-white">
                            LKR {Number(p.price).toLocaleString()}
                          </span>
                          {p.originalPrice && p.originalPrice > p.price && (
                            <span className="font-tech text-[10px] text-slate-400 line-through">
                              LKR {Number(p.originalPrice).toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="p-2.5 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleToggleStock(p.id)}
                        className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 ${
                          p.inStock
                            ? 'bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white'
                            : 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white'
                        }`}
                      >
                        <i className={`fa-solid ${p.inStock ? 'fa-ban' : 'fa-check'}`} />
                        <span>{p.inStock ? 'Sold Out' : 'In Stock'}</span>
                      </button>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleEditClick(p)}
                          className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-white/10 hover:bg-techla-500 hover:text-white text-slate-700 dark:text-slate-300 flex items-center justify-center transition-colors"
                          title="Edit"
                        >
                          <i className="fa-solid fa-pen-to-square text-[11px]" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="w-7 h-7 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white flex items-center justify-center transition-colors"
                          title="Delete"
                        >
                          <i className="fa-solid fa-trash-can text-[11px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================== TAB 2: ORDERS ==================== */}
        {activeTab === 'orders' && (
          <div className="space-y-3.5">
            {orders.length === 0 ? (
              <div className="p-10 text-center rounded-3xl bg-white dark:bg-[#071126] border border-slate-200 dark:border-white/10 text-slate-400">
                <i className="fa-solid fa-box-open text-3xl mb-2" />
                <h4 className="font-bold text-sm">No orders yet</h4>
                <p className="text-xs mt-0.5">When customers place orders, they will show up here.</p>
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#071126] border border-slate-200 dark:border-white/10 shadow-sm space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-white/5 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-techla-600 dark:text-cyan-400">
                          #{order.id.slice(0, 8).toUpperCase()}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                            order.userId
                              ? 'bg-blue-500/10 text-blue-500'
                              : 'bg-purple-500/10 text-purple-400'
                          }`}
                        >
                          {order.userId ? 'User' : 'Guest'}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                      </p>
                    </div>

                    <select
                      value={order.status}
                      onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                      className="text-xs font-bold px-2.5 py-1 rounded-xl border focus:outline-none dark:bg-[#071126]"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="PROCESSING">PROCESSING</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Customer:</span>
                      <p className="font-bold">{order.customerName}</p>
                      <a href={`tel:${order.customerPhone}`} className="text-techla-600 dark:text-cyan-400 font-bold">
                        📞 {order.customerPhone}
                      </a>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Address:</span>
                      <p className="text-slate-700 dark:text-slate-300">{order.shippingAddress}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Amount:</span>
                      <p className="font-tech text-sm font-extrabold text-techla-600 dark:text-cyan-400">
                        LKR {Number(order.totalAmount).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 dark:border-white/5 pt-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Items ({order.items?.length || 0}):
                    </span>
                    <div className="space-y-1">
                      {order.items?.map((item) => (
                        <div key={item.id} className="flex justify-between text-xs py-0.5">
                          <span className="truncate">{item.quantity}x {item.title}</span>
                          <span className="font-tech font-bold shrink-0 ml-2">
                            LKR {(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ==================== TAB 3: SETTINGS & PASSWORD ==================== */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1. Store Hotlines & Banner Config */}
            <form
              onSubmit={handleSaveSettings}
              className="p-6 rounded-3xl bg-white dark:bg-[#071126] border border-slate-200 dark:border-white/10 shadow-sm space-y-4"
            >
              <div>
                <h3 className="font-heading font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <i className="fa-solid fa-phone text-techla-500" />
                  <span>Store Contact & Hotlines</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Change the sales numbers and notice bar displayed on Techla.lk.
                </p>
              </div>

              {settingsMsg && (
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 text-xs font-bold text-techla-600 dark:text-cyan-400">
                  {settingsMsg}
                </div>
              )}

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Hotline Phone (Display on Navbar)
                  </label>
                  <input
                    type="text"
                    value={siteSettings.hotlinePhone}
                    onChange={(e) => setSiteSettings({ ...siteSettings, hotlinePhone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10"
                    placeholder="+94 77 123 4567"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-400 mb-1">
                    WhatsApp Number (Digits with country code, e.g. 94771234567)
                  </label>
                  <input
                    type="text"
                    value={siteSettings.whatsappNumber}
                    onChange={(e) => setSiteSettings({ ...siteSettings, whatsappNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10"
                    placeholder="94771234567"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Store Email
                  </label>
                  <input
                    type="email"
                    value={siteSettings.storeEmail}
                    onChange={(e) => setSiteSettings({ ...siteSettings, storeEmail: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10"
                    placeholder="sales@techla.lk"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Top Notice Bar Text
                  </label>
                  <textarea
                    rows={2}
                    value={siteSettings.noticeBanner}
                    onChange={(e) => setSiteSettings({ ...siteSettings, noticeBanner: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={settingsLoading}
                className="w-full py-2.5 rounded-xl bg-techla-600 hover:bg-techla-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 disabled:opacity-50"
              >
                {settingsLoading ? 'Saving...' : 'Save Hotline & Store Settings'}
              </button>
            </form>

            {/* 2. Admin Change Password Form */}
            <form
              onSubmit={handleChangePassword}
              className="p-6 rounded-3xl bg-white dark:bg-[#071126] border border-slate-200 dark:border-white/10 shadow-sm space-y-4"
            >
              <div>
                <h3 className="font-heading font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <i className="fa-solid fa-lock text-amber-500" />
                  <span>Admin Security & Password</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Update your admin login password. Current default is <code>admin123</code>.
                </p>
              </div>

              {passwordMsg.text && (
                <div
                  className={`p-3 rounded-xl text-xs font-bold ${
                    passwordMsg.type === 'success'
                      ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                      : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                  }`}
                >
                  {passwordMsg.text}
                </div>
              )}

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Current Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password (admin123)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-400 mb-1">
                    New Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new strong password"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Confirm New Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={passwordLoading}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 disabled:opacity-50"
              >
                {passwordLoading ? 'Updating...' : 'Update Admin Password'}
              </button>
            </form>

          </div>
        )}

        {/* ==================== TAB 4: SENSE.LK STYLE QUOTATION BUILDER ==================== */}
        {activeTab === 'quotation' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-[#071126] border border-slate-200 dark:border-white/10 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-white/5">
                <div>
                  <h3 className="text-lg font-black font-heading flex items-center gap-2">
                    <i className="fa-solid fa-file-invoice text-techla-500 text-xl" />
                    <span>Official Quotation Generator (Sense.lk Style)</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Generate corporate and customer quotations with Techla letterhead, 14-day validity, warranty terms, and instant PDF download.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setQuoteItems([]);
                      setQuoteCustomerName('');
                      setQuoteCompanyName('');
                      setQuotePhone('');
                    }}
                    className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-xs font-bold text-slate-600 dark:text-slate-300 transition-all"
                  >
                    Reset Form
                  </button>
                  <button
                    onClick={() => {
                      if (quoteItems.length === 0) {
                        alert('Please add at least 1 item to the quotation.');
                        return;
                      }
                      setIsAdminQuotationModalOpen(true);
                    }}
                    disabled={quoteItems.length === 0}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-techla-600 to-blue-600 hover:from-techla-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-techla-500/25 flex items-center gap-2 active:scale-95 transition-all disabled:opacity-50"
                  >
                    <i className="fa-solid fa-print text-sm" />
                    <span>Preview & Print Quotation ({quoteItems.length} Items)</span>
                  </button>
                </div>
              </div>

              {/* Client Information */}
              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Customer / Corporate Client Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-600 dark:text-slate-300 mb-1">
                      Customer Name *
                    </label>
                    <input
                      type="text"
                      value={quoteCustomerName}
                      onChange={(e) => setQuoteCustomerName(e.target.value)}
                      placeholder="e.g. Kasun Perera"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-600 dark:text-slate-300 mb-1">
                      Company / Organization (Optional)
                    </label>
                    <input
                      type="text"
                      value={quoteCompanyName}
                      onChange={(e) => setQuoteCompanyName(e.target.value)}
                      placeholder="e.g. Perera Holdings (Pvt) Ltd"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-600 dark:text-slate-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={quotePhone}
                      onChange={(e) => setQuotePhone(e.target.value)}
                      placeholder="e.g. 077 123 4567"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-600 dark:text-slate-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={quoteEmail}
                      onChange={(e) => setQuoteEmail(e.target.value)}
                      placeholder="e.g. client@example.com"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Add Product from Catalog */}
              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-white/5 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-techla-600 dark:text-cyan-400 flex items-center gap-1.5">
                    <i className="fa-solid fa-boxes-stacked" />
                    <span>Option A: Pick from Store Inventory</span>
                  </h4>
                  <div className="flex gap-2">
                    <select
                      value={selectedProductToAdd}
                      onChange={(e) => setSelectedProductToAdd(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-[#071126] border border-slate-200 dark:border-white/10 text-xs"
                    >
                      <option value="">-- Choose a Product --</option>
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.title} - LKR {Number(p.price).toLocaleString()}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => {
                        if (!selectedProductToAdd) return;
                        const found = products.find((p) => p.id === selectedProductToAdd);
                        if (found) {
                          setQuoteItems((prev) => [
                            ...prev,
                            {
                              id: found.id + '-' + Date.now(),
                              title: found.title,
                              price: Number(found.price),
                              qty: 1,
                              condition: found.condition || 'Brand New (Official Warranty)',
                              category: found.category,
                            },
                          ]);
                          setSelectedProductToAdd('');
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-techla-600 hover:bg-techla-500 text-white font-bold text-xs shrink-0 transition-all"
                    >
                      + Add
                    </button>
                  </div>
                </div>

                {/* Add Custom / Quotation-only Item */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
                    <i className="fa-solid fa-plus-circle" />
                    <span>Option B: Add Custom Item (Parts / Sourcing)</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="Custom item name..."
                      value={customItemTitle}
                      onChange={(e) => setCustomItemTitle(e.target.value)}
                      className="sm:col-span-3 px-3 py-1.5 rounded-xl bg-white dark:bg-[#071126] border border-slate-200 dark:border-white/10 text-xs"
                    />
                    <input
                      type="number"
                      placeholder="Price (LKR)"
                      value={customItemPrice}
                      onChange={(e) => setCustomItemPrice(e.target.value)}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#071126] border border-slate-200 dark:border-white/10 text-xs font-tech"
                    />
                    <input
                      type="text"
                      placeholder="Warranty (e.g. 2 Years)"
                      value={customItemWarranty}
                      onChange={(e) => setCustomItemWarranty(e.target.value)}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#071126] border border-slate-200 dark:border-white/10 text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!customItemTitle || !customItemPrice) {
                          alert('Please enter item name and price.');
                          return;
                        }
                        setQuoteItems((prev) => [
                          ...prev,
                          {
                            id: 'custom-' + Date.now(),
                            title: customItemTitle,
                            price: Number(customItemPrice),
                            qty: 1,
                            condition: customItemWarranty,
                            category: 'Custom Hardware',
                          },
                        ]);
                        setCustomItemTitle('');
                        setCustomItemPrice('');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-all"
                    >
                      + Add Item
                    </button>
                  </div>
                </div>
              </div>

              {/* Quotation Table */}
              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-white/5">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Quotation Line Items ({quoteItems.length})
                  </h4>
                  {quoteItems.length > 0 && (
                    <span className="font-tech text-xs text-slate-500">
                      Subtotal: LKR {quoteItems.reduce((acc, i) => acc + (i.price * (i.qty || 1)), 0).toLocaleString()}
                    </span>
                  )}
                </div>

                {quoteItems.length === 0 ? (
                  <div className="p-8 text-center border-2 border-dashed border-slate-200 dark:border-white/10 rounded-2xl text-slate-400 text-xs">
                    <i className="fa-solid fa-file-circle-plus text-3xl mb-2 text-slate-300 dark:text-slate-600" />
                    <p>No products added to quotation yet. Use Option A or Option B above.</p>
                  </div>
                ) : (
                  <div className="border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 text-slate-500 font-bold">
                        <tr>
                          <th className="p-3">#</th>
                          <th className="p-3">Product Description</th>
                          <th className="p-3">Warranty</th>
                          <th className="p-3 text-right">Unit Price (LKR)</th>
                          <th className="p-3 text-center">Qty</th>
                          <th className="p-3 text-right">Total (LKR)</th>
                          <th className="p-3 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                        {quoteItems.map((item, idx) => (
                          <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                            <td className="p-3 text-slate-400 font-tech">{idx + 1}</td>
                            <td className="p-3 font-bold text-slate-800 dark:text-slate-200">
                              {item.title}
                            </td>
                            <td className="p-3 text-[11px] text-emerald-600 dark:text-emerald-400">
                              {item.condition || 'Official Warranty'}
                            </td>
                            <td className="p-3 text-right font-tech font-bold">
                              {Number(item.price).toLocaleString()}
                            </td>
                            <td className="p-3 text-center">
                              <div className="inline-flex items-center gap-1 border border-slate-200 dark:border-white/10 rounded-lg px-2 py-0.5">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setQuoteItems((prev) =>
                                      prev.map((i) =>
                                        i.id === item.id ? { ...i, qty: Math.max(1, (i.qty || 1) - 1) } : i
                                      )
                                    );
                                  }}
                                  className="text-slate-500 hover:text-slate-900 font-bold px-1"
                                >
                                  -
                                </button>
                                <span className="font-tech font-bold">{item.qty || 1}</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setQuoteItems((prev) =>
                                      prev.map((i) =>
                                        i.id === item.id ? { ...i, qty: (i.qty || 1) + 1 } : i
                                      )
                                    );
                                  }}
                                  className="text-slate-500 hover:text-slate-900 font-bold px-1"
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td className="p-3 text-right font-tech font-bold text-techla-600 dark:text-cyan-400">
                              {(Number(item.price) * (item.qty || 1)).toLocaleString()}
                            </td>
                            <td className="p-3 text-center">
                              <button
                                type="button"
                                onClick={() => setQuoteItems((prev) => prev.filter((i) => i.id !== item.id))}
                                className="w-7 h-7 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white transition-colors"
                              >
                                <i className="fa-solid fa-trash-can text-xs" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

      </div>

      {/* Admin Quotation Printable Modal */}
      {isAdminQuotationModalOpen && (
        <QuotationModal
          isOpen={isAdminQuotationModalOpen}
          onClose={() => setIsAdminQuotationModalOpen(false)}
          items={quoteItems}
          totalAmount={quoteItems.reduce((acc, i) => acc + (i.price * (i.qty || 1)), 0)}
        />
      )}
    </div>
  );
}
