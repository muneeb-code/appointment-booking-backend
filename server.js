require('dotenv').config();
const express = require('express');
const cors = require('cors');

const bookingRoutes = require('./src/routes/bookingRoutes');
const consultantRoutes = require('./src/routes/consultantRoutes');
const customerRoutes = require('./src/routes/customerRoutes');
const errorHandler = require('./src/middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Distinct Modular API Routes
app.use('/bookings', bookingRoutes);
app.use('/consultants', consultantRoutes);
app.use('/customers', customerRoutes);

// Centralized Error Handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Modular Server running on http://localhost:${PORT}`);
});