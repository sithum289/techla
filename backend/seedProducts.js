const prisma = require('./src/db');

async function seedProducts() {
  try {
    const count = await prisma.product.count();
    if (count > 0) {
      console.log(`Database already has ${count} products.`);
      return;
    }

    const initialProducts = [
      {
        title: 'Samsung Galaxy S24 Ultra 5G (12GB / 512GB)',
        category: 'Mobile Phones',
        brand: 'Samsung',
        price: 345000,
        originalPrice: 385000,
        discount: 10,
        stock: 8,
        inStock: true,
        condition: 'Brand New (TRCSL Approved + 1 Year Company Warranty)',
        image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80'
        ],
        description: 'Titanium Gray, 200MP Quad Telephoto Camera, Snapdragon 8 Gen 3, S-Pen included, AI Galaxy features.',
        featured: true,
      },
      {
        title: 'Apple iPhone 15 Pro Max 256GB Natural Titanium',
        category: 'Mobile Phones',
        brand: 'Apple',
        price: 388000,
        originalPrice: 420000,
        discount: 8,
        stock: 5,
        inStock: true,
        condition: 'Brand New (Apple Care Official Warranty)',
        image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80'
        ],
        description: 'A17 Pro chip, Action Button, 5x Optical Zoom, Aerospace-grade titanium design.',
        featured: true,
      },
      {
        title: 'ASUS TUF Gaming A15 (Ryzen 7 7735HS, RTX 4060 8GB, 16GB, 512GB SSD)',
        category: 'Laptops & Notebooks',
        brand: 'ASUS',
        price: 325000,
        originalPrice: 350000,
        discount: 7,
        stock: 3,
        inStock: true,
        condition: 'Brand New (2 Years Asus Authorized Warranty)',
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80'
        ],
        description: '15.6" FHD 144Hz IPS display, NVIDIA GeForce RTX 4060, Military-grade durability, RGB backlit keyboard.',
        featured: true,
      },
      {
        title: 'Anker 65W GaN Fast Charger with 3 Ports (USB-C & USB-A)',
        category: 'Accessories & Gadgets',
        brand: 'Anker',
        price: 14500,
        originalPrice: 17500,
        discount: 17,
        stock: 25,
        inStock: true,
        condition: 'Brand New (18 Months Official Warranty)',
        image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80'
        ],
        description: 'High-speed fast charging for MacBooks, iPhones, Samsung Galaxy and laptops simultaneously.',
        featured: false,
      },
      {
        title: 'Hikvision 4-Camera 5MP ColorVu Audio Night CCTV Full Package',
        category: 'CCTV & Surveillance',
        brand: 'Hikvision',
        price: 68500,
        originalPrice: 79000,
        discount: 13,
        stock: 12,
        inStock: true,
        condition: 'Brand New (2 Years Barcode Authorized Warranty)',
        image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80'
        ],
        description: '24/7 Full Color with Built-in Mic, 4-Channel DVR, 1TB Seagate Surveillance HDD included.',
        featured: true,
      },
      {
        title: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
        category: 'Audio & Headsets',
        brand: 'Sony',
        price: 98000,
        originalPrice: 115000,
        discount: 15,
        stock: 0,
        inStock: false,
        condition: 'Brand New (Official Sony Warranty)',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
        ],
        description: 'Industry-leading noise cancellation, 30 hours battery life, Crystal clear hands-free calling.',
        featured: false,
      }
    ];

    for (const p of initialProducts) {
      await prisma.product.create({ data: p });
    }

    console.log('✅ Demo products added to store catalog successfully!');
  } catch (err) {
    console.error('Error seeding products:', err);
  } finally {
    process.exit(0);
  }
}

seedProducts();
