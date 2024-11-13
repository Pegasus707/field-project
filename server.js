const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const apiRoutes = require('./Routes/apiRoutes');

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());  // Middleware to parse JSON

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Check if MONGODB_URI is properly loaded
if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI is missing in the .env file');
} else {
  console.log('MONGODB_URI loaded successfully');
}

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// Register the API routes
app.use('/api', apiRoutes);

// Example route for testing (Optional)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');  // Serve the index.html file
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
