import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [activeForm, setActiveForm] = useState(""); // Tracks the active form

  const handleItemClick = (type) => {
    setActiveForm(type);
    setOpenDropdown(false); // Close dropdown when a form is selected
  };

  return (
    <div>
      <nav className="flex justify-between items-center p-6 bg-blue-300 flex-wrap">
        {/* Brand Name */}
        <h1 className="text-3xl font-bold">MedRec</h1>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Enter the product name"
          className="bg-gray-200 rounded-lg px-4 py-2 text-sm w-full max-w-md outline-none"
        />

        {/* Navigation Items */}
        <ul className="flex items-center space-x-6">
          {/* Dropdown for Services */}
          <li className="relative cursor-pointer">
            <div
              className="flex items-center"
              onClick={() => setOpenDropdown((prev) => !prev)}
            >
              <span>Services</span>
              <span className="ml-1">
                {openDropdown ? (
                  <ChevronUpIcon className="w-5 h-5 pt-1" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5 pt-1" />
                )}
              </span>
            </div>
            {openDropdown && (
              <ul className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg p-2 w-48">
                <li
                  className="p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                  onClick={() => handleItemClick("purchase")}
                >
                  Purchase Item
                </li>
                <li
                  className="p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                  onClick={() => handleItemClick("sale")}
                >
                  Sold Items
                </li>
              </ul>
            )}
          </li>

          {/* Other Nav Items */}
          <li className="cursor-pointer">User</li>
          <li className="cursor-pointer">Logout</li>
        </ul>
      </nav>

      {/* Conditional Forms */}
      <div className="p-6">
        {activeForm === "purchase" && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">Purchase Item</h2>
            <form className="grid gap-4">
              <input
                type="text"
                placeholder="Product Name"
                className="border rounded-lg px-4 py-2"
              />
              <input
                type="text"
                placeholder="Pack"
                className="border rounded-lg px-4 py-2"
              />
              <input
                type="text"
                placeholder="Batch"
                className="border rounded-lg px-4 py-2"
              />
              <input
                type="number"
                placeholder="Quantity"
                className="border rounded-lg px-4 py-2"
              />
              <input
                type="number"
                placeholder="Purchase Rate"
                className="border rounded-lg px-4 py-2"
              />
              <input
                type="number"
                placeholder="Amount"
                className="border rounded-lg px-4 py-2"
              />
              <button type="submit" className="bg-blue-300 w-auto px-4 py-2 rounded-lg">Enter</button>
            </form>
          </div>
        )}
        {activeForm === "sale" && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">Sold Items</h2>
            <form className="grid gap-4">
              <input
                type="text"
                placeholder="Product Name"
                className="border rounded-lg px-4 py-2"
              />
              <input
                type="text"
                placeholder="Pack"
                className="border rounded-lg px-4 py-2"
              />
              <input
                type="text"
                placeholder="Batch"
                className="border rounded-lg px-4 py-2"
              />
              <input
                type="number"
                placeholder="Quantity"
                className="border rounded-lg px-4 py-2"
              />
              <input
                type="number"
                placeholder="Sale Rate"
                className="border rounded-lg px-4 py-2"
              />
              <input
                type="number"
                placeholder="Amount"
                className="border rounded-lg px-4 py-2"
              />
              <button type="submit" className="bg-blue-300 w-auto px-4 py-2 rounded-lg">Enter</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
