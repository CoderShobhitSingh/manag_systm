import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault(); // Prevent form submission default behavior

    // Basic validation
    if (!fname || !lname || !email || !password) {
      alert("All fields are required.");
      return;
    }

    axios
      .post("http://localhost:3002/signup", { fname, lname, email, password })
      .then((response) => {
        if (response.status === 201) {
          console.log("User created successfully");
          alert("✅ Signup successful!");

          navigate("/login");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          alert("Email already exists.");
        } else {
          console.error("Error during signup:", err);
          alert("An error occurred. Please try again later.");
        }
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400">
      <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-10 w-96 space-y-6">
        <h2 className="text-3xl font-bold text-gray-700 mb-6">Register As New User</h2>
        <form onSubmit={handleSignup} className="w-full space-y-4">
          <input
            type="text"
            name="fname"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            placeholder="Enter your first name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="lname"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            placeholder="Enter your last name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email ID"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Register
          </button>
        </form>
        <Link to="/login" className="text-blue-500 self-end">
          Already have an account?
        </Link>
      </div>
    </div>
  );
};

export default Signup;
