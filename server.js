const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db'); // MongoDB connection

dotenv.config();

const app = express();

// Connect to MongoDB

connectDB();
// Middleware
app.use(cors());           // Enable cross-origin requests (for Angular frontend)
app.use(express.json());   // Parse JSON bodies


// Define PORT


const authRoutes = require('./routes/authRoutes');
app.use('/api/auth',authRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('Movie Booking API is running');
});
  

const PORT = 5001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

