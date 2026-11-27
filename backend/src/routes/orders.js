const express = require('express');
const router = express.Router();
const prisma = require('../db');
const { optionalAuth, requireAdmin } = require('../middleware/auth');

// 1. Place order (Guest or Registered User)
router.post('/', optionalAuth, async (req, res) => {
  try {
    const { customerName, customerPhone, customerEmail, shippingAddress, items, totalAmount, notes } = req.body;

    if (!customerName || !customerPhone || !shippingAddress || !items || items.length === 0) {
      return res.status(400).json({ error: 'Customer name, phone, address, and items are required' });
    }

    const userId = req.user ? req.user.id : null;

    const order = await prisma.order.create({
      data: {
        userId,
        customerName,
        customerPhone,
        customerEmail: customerEmail || (req.user ? req.user.email : null),
        shippingAddress,
        totalAmount: Number(totalAmount) || 0,
        notes: notes || '',
        items: {
          create: items.map((item) => ({
            productId: item.productId || null,
            title: item.title,
            price: Number(item.price) || 0,
            quantity: Number(item.quantity) || 1,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    // Auto calculate & increment salesCount for ordered products to rank "Most Popular"
    for (const item of items) {
      if (item.productId) {
        try {
          await prisma.product.update({
            where: { id: item.productId },
            data: { salesCount: { increment: Number(item.quantity) || 1 } },
          });
        } catch (e) {
          // ignore if product is unlinked
        }
      }
    }

    res.status(201).json({
      message: 'Order placed successfully',
      order,
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

// 2. Admin: Get all orders (with user & items)
router.get('/', requireAdmin, async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: true,
        user: {
          select: { id: true, email: true, name: true, role: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(orders);
  } catch (error) {
    console.error('Fetch orders error:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// 3. Admin: Update order status
router.patch('/:id/status', requireAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const updated = await prisma.order.update({
      where: { id },
      data: { status },
      include: { items: true },
    });

    res.json({ message: 'Order status updated', order: updated });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

module.exports = router;
