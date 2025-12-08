const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db'); // MongoDB connection

dotenv.config();

const app = express();
connectDB();

app.use(cors());           // Enable cross-origin requests (for Angular frontend)
app.use(express.json());   // Parse JSON bodies


const authRoutes = require('./routes/authRoutes');
app.use('/api/auth',authRoutes);

const movieRoutes = require('./routes/movieRoutes');
app.use('/api/movies',movieRoutes);

const cityRoutes = require('./routes/cityRoutes');
app.use('/api/cities',cityRoutes)

const theatreRoute = require('./routes/theatreRoutes');
app.use('/api/theatres',theatreRoute);

const showRoutes = require('./routes/showRoutes');
app.use('/api/show',showRoutes);

const bookRoutes = require('./routes/bookingRoutes');
app.use('/api/book',bookRoutes)

// Test route
app.get('/', (req, res) => {
    res.send('Movie Booking API is running');
});
  

const PORT = 5001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

