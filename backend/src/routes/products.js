const express = require('express');
const router = express.Router();
const prisma = require('../db');
const { requireAdmin } = require('../middleware/auth');

// Public: Get all products with filtering & search
router.get('/', async (req, res) => {
  try {
    const { category, search, inStock, featured } = req.query;
    let where = {};

    if (category && category !== 'all' && category !== 'All Products') {
      where.category = { equals: category, mode: 'insensitive' };
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { brand: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (inStock !== undefined) {
      where.inStock = inStock === 'true';
    }

    if (featured !== undefined) {
      where.featured = featured === 'true';
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    res.json(products);
  } catch (error) {
    console.error('Fetch products error:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Admin: Create product
router.post('/', requireAdmin, async (req, res) => {
  try {
    const {
      title,
      category,
      price,
      originalPrice,
      discount,
      stock,
      inStock,
      images,
      image,
      brand,
      description,
      condition,
      featured,
    } = req.body;

    if (!title || !category || price === undefined) {
      return res.status(400).json({ error: 'Title, category, and price are required' });
    }

    // Prepare images array
    let imagesArr = Array.isArray(images) ? images : [];
    if (imagesArr.length === 0 && image) {
      imagesArr = [image];
    }
    const coverImage = image || (imagesArr.length > 0 ? imagesArr[0] : '');

    // Calculate discount % if originalPrice is provided
    let calculatedDiscount = discount ? Number(discount) : null;
    if (!calculatedDiscount && originalPrice && Number(originalPrice) > Number(price)) {
      calculatedDiscount = Math.round(((Number(originalPrice) - Number(price)) / Number(originalPrice)) * 100);
    }

    const product = await prisma.product.create({
      data: {
        title,
        category,
        price: Number(price),
        originalPrice: originalPrice ? Number(originalPrice) : null,
        discount: calculatedDiscount,
        stock: Number(stock) || 0,
        inStock: inStock !== undefined ? inStock : (Number(stock) > 0),
        images: imagesArr,
        image: coverImage,
        brand: brand || '',
        description: description || '',
        condition: condition || 'Brand New',
        featured: Boolean(featured),
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Admin: Update product
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      category,
      price,
      originalPrice,
      discount,
      stock,
      inStock,
      images,
      image,
      brand,
      description,
      condition,
      featured,
    } = req.body;

    let imagesArr = Array.isArray(images) ? images : undefined;
    const coverImage = image || (imagesArr && imagesArr.length > 0 ? imagesArr[0] : undefined);

    let calculatedDiscount = discount !== undefined ? Number(discount) : undefined;
    if (originalPrice && Number(originalPrice) > Number(price)) {
      calculatedDiscount = Math.round(((Number(originalPrice) - Number(price)) / Number(originalPrice)) * 100);
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        title,
        category,
        price: price !== undefined ? Number(price) : undefined,
        originalPrice: originalPrice !== undefined ? (originalPrice ? Number(originalPrice) : null) : undefined,
        discount: calculatedDiscount,
        stock: stock !== undefined ? Number(stock) : undefined,
        inStock: inStock !== undefined ? inStock : undefined,
        images: imagesArr,
        image: coverImage,
        brand,
        description,
        condition,
        featured,
      },
    });

    res.json(product);
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Admin: Toggle Stock (Quick In Stock / Sold Out)
router.patch('/:id/toggle-stock', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const current = await prisma.product.findUnique({ where: { id } });
    if (!current) return res.status(404).json({ error: 'Product not found' });

    const updated = await prisma.product.update({
      where: { id },
      data: { inStock: !current.inStock },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to toggle stock status' });
  }
});

// Admin: Delete product
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({ where: { id } });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;
