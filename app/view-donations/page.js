 "use client";
import { useState, useEffect } from "react";

export default function ViewDonations() {
  const [available, setAvailable] = useState([]);
  const [donated, setDonated] = useState([]);

  const loadData = () => {
    const data = JSON.parse(localStorage.getItem("donations")) || [];

    setAvailable(data.filter(d => d.status === "AVAILABLE"));
    setDonated(data.filter(d => d.status === "DONATED"));
  };

  useEffect(() => {
    loadData();

    // Auto refresh
    window.addEventListener("focus", loadData);
    return () => window.removeEventListener("focus", loadData);
  }, []);

  const acceptDonation = (food) => {
    const data = JSON.parse(localStorage.getItem("donations")) || [];

    const updated = data.map(item =>
      item.id === food.id
        ? { ...item, status: "DONATED" }
        : item
    );

    localStorage.setItem("donations", JSON.stringify(updated));

    // 🔥 Create Delivery
    const newDelivery = {
      id: Date.now(),
      food: food.name,
      donor: food.name,
      phone: food.phone,
      location: food.location,
      quantity: food.quantity,
      preparedDate: food.preparedDate,
      ngo: "Helping Hands NGO",
      status: "PENDING"
    };

    const deliveries =
      JSON.parse(localStorage.getItem("deliveries")) || [];

    localStorage.setItem(
      "deliveries",
      JSON.stringify([...deliveries, newDelivery])
    );

    loadData();
  };

  return (
    <main className="p-6 bg-gradient-to-br from-blue-100 to-purple-100 min-h-screen">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold text-blue-600 text-center mb-8">
          View Donations
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          {/* AVAILABLE */}
          <div className="bg-white p-5 rounded-xl shadow border-l-4 border-orange-400">
            <h2 className="text-xl font-bold text-orange-600 mb-4">
              🎁 Available Donations
            </h2>

            {available.length === 0 && (
              <p className="text-gray-500">No available food</p>
            )}

            {available.map(food => (
              <div key={food.id} className="bg-orange-50 p-4 mb-3 rounded">
                <h3 className="font-bold text-orange-800">{food.name}</h3>

                <p className="text-sm">Qty: {food.quantity}</p>
                <p className="text-sm">Location: {food.location}</p>
                <p className="text-sm">Phone: {food.phone}</p>

                <button
                  onClick={() => acceptDonation(food)}
                  className="mt-3 w-full bg-orange-400 text-white p-2 rounded"
                >
                  Accept
                </button>
              </div>
            ))}
          </div>

          {/* ACCEPTED */}
          <div className="bg-white p-5 rounded-xl shadow border-l-4 border-green-400">
            <h2 className="text-xl font-bold text-green-600 mb-4">
              ✓ Accepted Donations
            </h2>

            {donated.length === 0 && (
              <p className="text-gray-500">No accepted food</p>
            )}

            {donated.map(food => (
              <div key={food.id} className="bg-green-50 p-4 mb-3 rounded">
                <h3 className="font-bold text-green-800">{food.name}</h3>

                <p className="text-sm">Qty: {food.quantity}</p>
                <p className="text-sm">Location: {food.location}</p>

                <span className="inline-block mt-2 bg-green-600 text-white px-3 py-1 rounded text-sm">
                  DONATED
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </main>
  );
}
