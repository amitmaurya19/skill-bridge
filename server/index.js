const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import User Model
const UserModel = require('./models/User');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/temp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Register Endpoint
app.post('/register', async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    // Check if email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }

    // Create new user
    const newUser = new UserModel({
      name,
      email,
      phone,
      password
    });

    await newUser.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Import routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
