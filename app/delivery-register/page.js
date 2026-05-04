 "use client";
import { useState } from "react";

export default function DeliveryRegister() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [company, setCompany] = useState("");
  const [showMsg, setShowMsg] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    const newPartner = {
      id: Date.now(),
      name,
      phone,
      email,
      vehicle,
      company,
    };

    const existing = JSON.parse(localStorage.getItem("partners")) || [];
    const updated = [...existing, newPartner];

    localStorage.setItem("partners", JSON.stringify(updated));

    // show success message
    setShowMsg(true);
    setTimeout(() => setShowMsg(false), 2000);

    // clear form
    setName("");
    setPhone("");
    setEmail("");
    setVehicle("");
    setCompany("");
  };

  return (
    <main className="p-6 bg-gradient-to-br from-blue-100 to-purple-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-blue-200 max-w-md w-full">

        <h1 className="text-3xl font-bold text-blue-600 text-center mb-2">
          🚚 Delivery Registration
        </h1>

        <p className="text-center text-gray-500 mb-6 text-sm">
          Register as a delivery partner
        </p>

        <form onSubmit={handleRegister} className="flex flex-col gap-3">

          <div>
            <label className="block text-blue-700 font-semibold mb-1 text-sm">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              className="w-full border-2 border-blue-300 p-2 rounded-lg bg-blue-50 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-blue-700 font-semibold mb-1 text-sm">
              Phone
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone"
              className="w-full border-2 border-blue-300 p-2 rounded-lg bg-blue-50 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-blue-700 font-semibold mb-1 text-sm">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full border-2 border-blue-300 p-2 rounded-lg bg-blue-50 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-blue-700 font-semibold mb-1 text-sm">
              Vehicle
            </label>
            <input
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              placeholder="e.g., Bike / Car"
              className="w-full border-2 border-blue-300 p-2 rounded-lg bg-blue-50 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-blue-700 font-semibold mb-1 text-sm">
              Company
            </label>
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g., Swiggy, Uber"
              className="w-full border-2 border-blue-300 p-2 rounded-lg bg-blue-50 text-sm"
              required
            />
          </div>

          <button className="bg-gradient-to-r from-blue-400 to-blue-500 text-white p-2 rounded-lg font-bold text-sm mt-4">
            ✓ Register
          </button>

        </form>

        {/* Success Message */}
        {showMsg && (
          <p className="text-green-600 text-center mt-3">
            Delivery Partner Registered!
          </p>
        )}

      </div>
    </main>
  );
}
