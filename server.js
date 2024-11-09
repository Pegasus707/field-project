const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());  // Middleware to parse JSON

// Check if MONGODB_URI is properly loaded
console.log(process.env.MONGODB_URI);  // This will print the MongoDB URI to check if it's loaded

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI,)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error);
    });

// Example route for testing
app.get('/', (req, res) => {
    res.send('Hello, this is your server running!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
