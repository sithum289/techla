const express = require('express');
const router = express.Router();
const prisma = require('../db');
const { requireAdmin } = require('../middleware/auth');

// Public: Get site settings (Hotlines, WhatsApp, Banners)
router.get('/', async (req, res) => {
  try {
    let settings = await prisma.siteSetting.findUnique({
      where: { id: 'global_settings' },
    });

    if (!settings) {
      settings = await prisma.siteSetting.create({
        data: {
          id: 'global_settings',
          hotlinePhone: '+94 77 123 4567',
          whatsappNumber: '94771234567',
          storeEmail: 'sales@techla.lk',
          noticeBanner: 'Island-wide Cash on Delivery | Direct Authorized Agent Barcode Warranty | Showroom Pickup Available',
          showroomAddress: 'Colombo, Sri Lanka',
        },
      });
    }

    res.json(settings);
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// Admin: Update site settings (Hotline, WhatsApp, etc.)
router.put('/', requireAdmin, async (req, res) => {
  try {
    const { hotlinePhone, whatsappNumber, storeEmail, noticeBanner, showroomAddress } = req.body;

    const updated = await prisma.siteSetting.upsert({
      where: { id: 'global_settings' },
      update: {
        hotlinePhone,
        whatsappNumber,
        storeEmail,
        noticeBanner,
        showroomAddress,
      },
      create: {
        id: 'global_settings',
        hotlinePhone: hotlinePhone || '+94 77 123 4567',
        whatsappNumber: whatsappNumber || '94771234567',
        storeEmail: storeEmail || 'sales@techla.lk',
        noticeBanner: noticeBanner || 'Island-wide Delivery Available',
        showroomAddress: showroomAddress || 'Colombo, Sri Lanka',
      },
    });

    res.json({ message: 'Settings updated successfully', settings: updated });
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

module.exports = router;
