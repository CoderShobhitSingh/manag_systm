const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const UserModel = require("./model/User");


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

// Signup route
app.post("/signup", async (req, res) => {
  try {
    const { fname,lname, email, password } = req.body;

    // Validate incoming data
    if (!fname || !lname || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user already exists (by email or Adhaar)
    const existingUser = await UserModel.findOne({
      $or: [{ email }],
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user instance
    const newUser = new UserModel({
      fname,
      lname,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Respond with the saved user (exclude sensitive information like password)
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: savedUser._id,
        fname: savedUser.fname,
        lname: savedUser.lname,
        email: savedUser.email,
      },
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Allow login with either email or Adhaar
    const user = await UserModel.findOne({ $or: [{ email }] });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        res.json("Success");
      } else {
        res.status(401).json("Password does not match");
      }
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Routes
app.get("/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.post("/items", async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.json(newItem);
});

app.put("/items/:id", async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const updatedItem = await Item.findByIdAndUpdate(id, { $inc: { quantity: -quantity } }, { new: true });
  res.json(updatedItem);
});