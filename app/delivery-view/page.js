 "use client";
import { useState, useEffect } from "react";

export default function ViewDeliveries() {
  const [deliveries, setDeliveries] = useState([]);

  // Load deliveries
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("deliveries")) || [];
    setDeliveries(stored);
  }, []);

  // Save deliveries
  useEffect(() => {
    localStorage.setItem("deliveries", JSON.stringify(deliveries));
  }, [deliveries]);

  // Accept Delivery
  const acceptDelivery = (id) => {
    const updated = deliveries.map((d) =>
      d.id === id
        ? { ...d, status: "IN TRANSIT" }
        : d
    );
    setDeliveries(updated);
  };

  // Mark as Delivered
  const markDelivered = (id) => {
    const updated = deliveries.map((d) =>
      d.id === id
        ? { ...d, status: "DELIVERED" }
        : d
    );
    setDeliveries(updated);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-green-100 to-blue-100">
      
      <h1 className="text-3xl font-bold text-green-600 mb-6">
        🚚 View Deliveries
      </h1>

      {deliveries.length === 0 ? (
        <p className="text-gray-600">No deliveries available</p>
      ) : (
        <div className="space-y-5">
          {deliveries.map((d) => (
            <div
              key={d.id}
              className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500"
            >
              {/* Food */}
              <h2 className="text-xl font-bold text-blue-600 mb-2">
                🍱 {d.food}
              </h2>

              {/* Details */}
              <div className="text-gray-700 space-y-1">
                <p><b>Donor:</b> {d.donor}</p>
                <p><b>NGO:</b> {d.ngo}</p>
                <p><b>Location:</b> {d.location}</p>
                <p><b>Quantity:</b> {d.quantity}</p>
                <p><b>Prepared Date:</b> {d.preparedDate}</p>
              </div>

              {/* Status */}
              <p className="mt-3">
                <b>Status:</b>{" "}
                <span className={`font-semibold ${
                  d.status === "PENDING" ? "text-yellow-600" :
                  d.status === "IN TRANSIT" ? "text-blue-600" :
                  "text-green-600"
                }`}>
                  {d.status}
                </span>
              </p>

              {/* Buttons */}
              <div className="mt-4 flex gap-3">
                
                {d.status === "PENDING" && (
                  <button
                    onClick={() => acceptDelivery(d.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Accept Delivery
                  </button>
                )}

                {d.status === "IN TRANSIT" && (
                  <button
                    onClick={() => markDelivered(d.id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                  >
                    Mark as Delivered
                  </button>
                )}

                {d.status === "DELIVERED" && (
                  <div className="text-green-600 font-bold">
                    ✅ Delivered Successfully
                  </div>
                )}

              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
