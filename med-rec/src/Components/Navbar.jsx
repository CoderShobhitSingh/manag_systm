import React, { useState, useEffect } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [activeForm, setActiveForm] = useState("");
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleItemClick = (type) => {
    setActiveForm(type);
    setOpenDropdown(false);
  };

  const handlePurchase = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newProduct = {
      name: formData.get("productName"),
      pack: formData.get("pack"),
      batch: formData.get("batch"),
      quantity: parseInt(formData.get("quantity")),
      rate: parseFloat(formData.get("rate")),
      amount: parseFloat(formData.get("amount")),
    };

    setProducts((prev) => [...prev, newProduct]);
    setActiveForm("");
    e.target.reset();
  };

  const handleSale = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const saleDetails = {
      name: formData.get("productName"),
      quantity: parseInt(formData.get("quantity")),
    };

    setProducts((prev) =>
      prev.map((product) =>
        product.name === saleDetails.name
          ? {
              ...product,
              quantity: Math.max(0, product.quantity - saleDetails.quantity),
            }
          : product
      )
    );
    setActiveForm("");
    e.target.reset();
  };

  return (
    <div>
      {/* Navbar code */}
      <nav className="flex justify-between items-center p-6 bg-blue-300 flex-wrap">
        <h1 className="text-3xl font-bold">MedRec</h1>
        <input
          type="text"
          placeholder="Search products..."
          className="bg-gray-200 rounded-lg px-4 py-2 text-sm w-full max-w-md outline-none"
        />
        <ul className="flex items-center space-x-6">
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
          <li className="cursor-pointer">User</li>
          <li className="cursor-pointer">Logout</li>
        </ul>
      </nav>

      {/* Forms and Inventory */}
      <div className="p-6">
        {activeForm === "purchase" && (
          <form
            onSubmit={handlePurchase}
            className="bg-gray-100 p-4 rounded-lg shadow-md grid gap-4"
          >
            <h2 className="text-lg font-bold mb-4">Purchase Item</h2>
            <input
              name="productName"
              type="text"
              placeholder="Product Name"
              className="border rounded-lg px-4 py-2"
              required
            />
            <input
              name="pack"
              type="text"
              placeholder="Pack"
              className="border rounded-lg px-4 py-2"
              required
            />
            <input
              name="batch"
              type="text"
              placeholder="Batch"
              className="border rounded-lg px-4 py-2"
              required
            />
            <input
              name="quantity"
              type="number"
              placeholder="Quantity"
              className="border rounded-lg px-4 py-2"
              min="1"
              required
            />
            <input
              name="rate"
              type="number"
              placeholder="Purchase Rate"
              className="border rounded-lg px-4 py-2"
              min="0.01"
              step="0.01"
              required
            />
            <input
              name="amount"
              type="number"
              placeholder="Amount"
              className="border rounded-lg px-4 py-2"
              min="0.01"
              step="0.01"
              required
            />
            <button type="submit" className="bg-blue-300 w-auto px-4 py-2 rounded-lg">
              Enter
            </button>
          </form>
        )}
        {activeForm === "sale" && (
          <form
            onSubmit={handleSale}
            className="bg-gray-100 p-4 rounded-lg shadow-md grid gap-4"
          >
            <h2 className="text-lg font-bold mb-4">Sold Items</h2>
            <input
              name="productName"
              type="text"
              placeholder="Product Name"
              className="border rounded-lg px-4 py-2"
              required
            />
            <input
              name="quantity"
              type="number"
              placeholder="Quantity"
              className="border rounded-lg px-4 py-2"
              min="1"
              required
            />
            <button type="submit" className="bg-blue-300 w-auto px-4 py-2 rounded-lg">
              Enter
            </button>
          </form>
        )}
      </div>

      {/* Inventory List */}
      {products.length > 0 && (
        <div className="p-6">
          <h2 className="text-lg font-bold mb-4">Inventory</h2>
          <ul className="grid gap-4">
            {products.map((product, index) => (
              <li key={index} className="bg-white p-4 rounded-lg shadow-md">
                <p>
                  <strong>Product:</strong> {product.name}
                </p>
                <p>
                  <strong>Quantity:</strong> {product.quantity}
                </p>
                <p>
                  <strong>Batch:</strong> {product.batch}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
