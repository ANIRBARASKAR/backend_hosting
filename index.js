// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://aniruddha:CziA9MFYjeAe46TQ@cluster0.mwkklgl.mongodb.net/backend_hosting?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Define User Schema
const userSchema = new mongoose.Schema({
  userName: String,
  mobile: Number,
  email: String,
});

const User = mongoose.model('User', userSchema);

// Routes
app.post('/api/register', async (req, res) => {
  try {
    const { userName, mobile, email } = req.body;

    // Validate input (you can add more validation as needed)

    // Create a new user
    const newUser = new User({ userName, mobile, email });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// New route to get all users
app.get('/api/users', async (req, res) => {
    try {
      const users = await User.find();
        
      // Log the retrieved users to the console
      console.log('Retrieved Users:', users);
  
      res.status(200).json(users);  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
