const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema(
    {
      fname: {
        type: String,
        required: true // Name is mandatory
      },
      lname: {
        type: String,
        required: true, // Name is mandatory
      },
      email: {
        type: String,
        required: true, // Email is mandatory
        unique: true, // Ensures no duplicate emails
        trim: true, // Removes extra spaces
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Validates email format
      },
      password: {
        type: String,
        required: true, // Password is mandatory
        minlength: 8, // Minimum password length
      },
    },
    { timestamps: true } // Adds createdAt and updatedAt fields automatically
  );
  
  const UserModel = mongoose.model("User", UserSchema);
  
  module.exports = UserModel;
  