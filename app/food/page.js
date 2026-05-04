"use client";
import { useState, useEffect } from "react";

export default function AddFood() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [donations, setDonations] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  // Load existing data
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("donations")) || [];
    setDonations(data);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFood = {
      id: Date.now(),
      name,
      phone,
      quantity,
      location,
      preparedDate: date,
      status: "AVAILABLE",
    };

    const updated = [...donations, newFood];
    setDonations(updated);
    localStorage.setItem("donations", JSON.stringify(updated));

    // Show popup message
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);

    // Clear form
    setName("");
    setPhone("");
    setQuantity("");
    setLocation("");
    setDate("");
  };

  return (
    <main className="p-4 bg-gradient-to-br from-green-100 to-blue-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-green-200 max-w-lg w-full backdrop-blur">
        
        <h1 className="text-3xl font-bold text-green-600 text-center mb-2">
          🍽️ Add Food Donation
        </h1>

        <p className="text-center text-gray-500 mb-6 text-sm">
          Share your surplus food with those in need
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          
          <div>
            <label className="block text-green-700 font-semibold mb-1 text-sm">
              Food Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Rice, Biryani, Fruits"
              className="w-full border-2 border-green-300 p-2 rounded-lg bg-green-50 text-sm"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-green-700 font-semibold mb-1 text-sm">
                Phone
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Your contact"
                className="w-full border-2 border-green-300 p-2 rounded-lg bg-green-50 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-green-700 font-semibold mb-1 text-sm">
                Quantity
              </label>
              <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g., 5 kg"
                className="w-full border-2 border-green-300 p-2 rounded-lg bg-green-50 text-sm"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-green-700 font-semibold mb-1 text-sm">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Pickup location"
              className="w-full border-2 border-green-300 p-2 rounded-lg bg-green-50 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-green-700 font-semibold mb-1 text-sm">
              Prepared Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border-2 border-green-300 p-2 rounded-lg bg-green-50 text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-green-400 to-green-500 text-white p-2 rounded-lg font-bold text-sm mt-4"
          >
            ✓ Submit Donation
          </button>
        </form>

        {/* Popup Message */}
        {showMessage && (
          <p className="text-green-600 mt-3 text-center">
            Food added successfully!
          </p>
        )}

        {/* Show All Donations */}
        <h3 className="mt-6 font-bold">Food Donations</h3>

        {donations.map((item) => (
          <div key={item.id}>
            <p>{item.name}</p>
            <p>{item.quantity}</p>
            <p>{item.location}</p>
            <p>{item.status}</p>
          </div>
        ))}

      </div>
    </main>
  );
}
