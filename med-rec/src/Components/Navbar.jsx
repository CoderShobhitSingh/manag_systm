import React, { useState, useEffect } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [activeForm, setActiveForm] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  useEffect(() => {
    // Filter out products with zero quantity before saving to localStorage
    const updatedProducts = products.filter((product) => product.quantity > 0);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  }, [products]);

  const handleItemClick = (type) => {
    setActiveForm(type);
    setOpenDropdown(false);
  };

  const handlePurchase = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newProduct = {
      name: formData.get("productName").toLowerCase(), // Ensure case-insensitive search
      pack: formData.get("pack"),
      expiryDate: formData.get("expiryDate"),
      quantity: parseInt(formData.get("quantity")),
      rate: parseFloat(formData.get("rate")),
      amount: parseFloat(formData.get("amount")),
    };

    setProducts((prev) => {
      const existingProduct = prev.find(
        (product) =>
          product.name === newProduct.name &&
          product.expiryDate === newProduct.expiryDate
      );

      if (existingProduct) {
        return prev.map((product) =>
          product.name === newProduct.name &&
          product.expiryDate === newProduct.expiryDate
            ? {
                ...product,
                quantity: product.quantity + newProduct.quantity,
              }
            : product
        );
      } else {
        return [...prev, newProduct];
      }
    });

    setActiveForm("");
    e.target.reset();
  };

  const handleSale = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const saleDetails = {
      name: formData.get("productName").toLowerCase(),
      quantity: parseInt(formData.get("quantity")),
      expiryDate: formData.get("expiryDate"),
      sellRate: parseFloat(formData.get("sellRate")),
      sellAmount: parseFloat(formData.get("sellAmount")),
    };

    setProducts((prev) => {
      const productToSell = prev.find(
        (product) =>
          product.name === saleDetails.name &&
          product.expiryDate === saleDetails.expiryDate
      );

      if (productToSell && productToSell.quantity >= saleDetails.quantity) {
        // Calculate profit/loss
        const profitOrLoss = saleDetails.sellAmount - productToSell.rate * saleDetails.quantity;

        // Log profit/loss for Excel or further tracking
        console.log("Profit/Loss: ", profitOrLoss);

        // Update product quantity after sale
        return prev
          .map((product) =>
            product.name === saleDetails.name &&
            product.expiryDate === saleDetails.expiryDate
              ? {
                  ...product,
                  quantity: product.quantity - saleDetails.quantity,
                }
              : product
          )
          .filter((product) => product.quantity > 0); // Remove product if quantity becomes zero or less
      }
      return prev;
    });

    setActiveForm("");
    e.target.reset();
  };

  // Filter out products with quantity 0 and match the search term
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      product.quantity > 0 // Exclude products with 0 quantity
  );

  const [expandedProduct, setExpandedProduct] = useState(null);

  const toggleDetails = (index) => {
    setExpandedProduct(expandedProduct === index ? null : index);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 bg-blue-300 flex-wrap">
        <h1 className="text-3xl font-bold">MedRec</h1>
        <input
          type="text"
          placeholder="Search products..."
          className="bg-gray-200 rounded-lg px-4 py-2 text-sm w-full max-w-md outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update the search term
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

      {/* Forms */}
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
              name="expiryDate"
              type="date"
              placeholder="Expiry Date"
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
              name="expiryDate"
              type="date"
              placeholder="Expiry Date"
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
              name="sellRate"
              type="number"
              placeholder="Sell Rate"
              className="border rounded-lg px-4 py-2"
              min="0.01"
              step="0.01"
              required
            />
            <input
              name="sellAmount"
              type="number"
              placeholder="Sell Amount"
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
      </div>

      {/* Filtered Inventory List */}
      {filteredProducts.length > 0 && (
        <div className="p-6">
          <h2 className="text-lg font-bold mb-4">Inventory</h2>
          <ul className="grid gap-4">
            {filteredProducts.map((product, index) => (
              <li key={index} className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{product.name}</span>
                  <span>{product.quantity} in stock</span>
                </div>
                <button
                  className="text-blue-500 mt-2"
                  onClick={() => toggleDetails(index)}
                >
                  {expandedProduct === index ? "Show Less" : "Show More"}
                </button>
                {expandedProduct === index && (
                  <div className="mt-2 text-sm text-gray-700">
                    <p>Expiry Date: {product.expiryDate}</p>
                    <p>Rate: ₹{product.rate}</p>
                    <p>Amount: ₹{product.amount}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
