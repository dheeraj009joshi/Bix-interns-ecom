const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorMiddleware');
const cors = require('cors');

// Load environment variables
dotenv.config({ path: './.env' });

// Connect to the database
connectDB();

const app = express();

// Body parser
app.use(express.json());

app.use(cors());


// Mount routers
app.use('/api/v1/order', require('./Routes/orderRoute'));
app.use('/api/v1/product', require('./Routes/productRoute'));

// Error handling middleware
app.use(errorHandler);

module.exports = app;
