const bcrypt = require('bcrypt');
const prisma = require('./src/db');

async function seedAdmin() {
  try {
    const adminEmail = 'admin@techla.lk';
    const existing = await prisma.user.findUnique({ where: { email: adminEmail } });

    if (existing) {
      console.log('Admin account already exists:', adminEmail);
      return;
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: 'Techla Admin',
        phone: '+94 77 123 4567',
        role: 'ADMIN',
      },
    });

    console.log('✅ Admin account created successfully:');
    console.log('Email: admin@techla.lk');
    console.log('Password: admin123');
  } catch (err) {
    console.error('Error seeding admin:', err);
  } finally {
    process.exit(0);
  }
}

seedAdmin();
