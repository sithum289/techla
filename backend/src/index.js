require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require("path");

const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orders');
const productRoutes = require('./routes/products');
const settingsRoutes = require('./routes/settings');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/settings', settingsRoutes);

app.get('/', (req, res) => {
    res.json({ message: "Techla API is running..." });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
