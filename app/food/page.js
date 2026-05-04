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

  // Load donations
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
              placeholder="e.g., Rice, Biryani"
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border-2 border-green-300 p-2 rounded-lg bg-green-50 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-green-700 font-semibold mb-1 text-sm">
                Quantity
              </label>
              <input
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
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
              value={location}
              onChange={(e) => setLocation(e.target.value)}
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

        {/* Popup */}
        {showMessage && (
          <p className="text-green-600 text-center mt-3">
            Food added successfully!
          </p>
        )}

        {/* Donations Section */}
        <h3 className="mt-6 font-bold text-lg text-gray-700">
          Food Donations
        </h3>

        <div className="mt-4 space-y-3">
          {donations.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-lg border shadow-sm ${
                item.status === "AVAILABLE"
                  ? "bg-orange-50 border-orange-200"
                  : "bg-green-50 border-green-200"
              }`}
            >
              <p className="font-bold text-gray-800">{item.name}</p>

              <p className="text-sm text-gray-600">
                Quantity: {item.quantity}
              </p>

              <p className="text-sm text-gray-600">
                Location: {item.location}
              </p>

              <p
                className={`mt-2 text-sm font-semibold ${
                  item.status === "AVAILABLE"
                    ? "text-orange-600"
                    : "text-green-600"
                }`}
              >
                {item.status}
              </p>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
