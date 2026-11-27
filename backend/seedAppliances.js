const prisma = require('./src/db');

async function seedHomeAppliances() {
  try {
    const appliances = [
      {
        title: 'Singer Inverter Double Door Refrigerator 240L (Frost Free)',
        category: 'Refrigerators & Freezers',
        brand: 'Singer',
        price: 168000,
        originalPrice: 189000,
        discount: 11,
        stock: 5,
        inStock: true,
        condition: 'Brand New (10 Years Singer Warranty on Compressor)',
        image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80'
        ],
        description: 'Multi Air Flow cooling, Energy saving digital inverter compressor, Tempered glass shelves, LED interior lighting.',
        featured: true,
      },
      {
        title: 'LG 8kg Smart Inverter Fully Automatic Top Load Washing Machine',
        category: 'Washing Machines',
        brand: 'LG',
        price: 142000,
        originalPrice: 158000,
        discount: 10,
        stock: 4,
        inStock: true,
        condition: 'Brand New (10 Years Official Abans Warranty on Motor)',
        image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80'
        ],
        description: 'TurboDrum, Smart Motion, Waterfall Circulation, Stainless steel tub, Auto-restart power failure function.',
        featured: true,
      },
      {
        title: 'Philips Digital Air Fryer XL 4.1L (Rapid Air Technology)',
        category: 'Kitchen Appliances',
        brand: 'Philips',
        price: 36500,
        originalPrice: 42000,
        discount: 13,
        stock: 15,
        inStock: true,
        condition: 'Brand New (2 Years Company Warranty)',
        image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80'
        ],
        description: 'Cook with up to 90% less fat. Touch screen with 7 presets, keep warm function, dishwasher safe parts.',
        featured: false,
      }
    ];

    for (const item of appliances) {
      await prisma.product.create({ data: item });
    }

    console.log('✅ Home appliances added to store!');
  } catch (err) {
    console.error('Error seeding appliances:', err);
  } finally {
    process.exit(0);
  }
}

seedHomeAppliances();
