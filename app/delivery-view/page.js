"use client";
import { useState, useEffect } from "react";

export default function ViewDeliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [user, setUser] = useState("");

  const loadData = () => {
    const data =
      JSON.parse(localStorage.getItem("deliveries")) || [];
    setDeliveries(data);
  };

  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedInUser");

    // 🔒 Protect page
    if (!loggedUser) {
      window.location.href = "/delivery-login";
      return;
    }

    setUser(loggedUser);

    loadData();

    // 🔄 Auto refresh
    window.addEventListener("focus", loadData);
    return () => window.removeEventListener("focus", loadData);
  }, []);

  const updateStatus = (id, status) => {
    const data =
      JSON.parse(localStorage.getItem("deliveries")) || [];

    const updated = data.map(d =>
      d.id === id ? { ...d, status } : d
    );

    localStorage.setItem("deliveries", JSON.stringify(updated));
    setDeliveries(updated);
  };

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "/delivery-login";
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-600">
          🚚 Deliveries
        </h1>

        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-semibold">
            👤 {user}
          </span>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* EMPTY */}
      {deliveries.length === 0 && (
        <p className="text-center text-gray-500">
          No deliveries available
        </p>
      )}

      {/* CARDS */}
      {deliveries.map(d => (
        <div
          key={d.id}
          className="bg-white p-5 mb-4 rounded-xl shadow border-l-4 border-blue-400"
        >
          <h2 className="text-xl font-bold text-blue-700 mb-2">
            {d.food}
          </h2>

          <div className="text-gray-700 text-sm space-y-1">
            <p><b>Donor:</b> {d.donor}</p>
            <p><b>Phone:</b> {d.phone}</p>
            <p><b>NGO:</b> {d.ngo}</p>
            <p><b>Location:</b> {d.location}</p>
            <p><b>Quantity:</b> {d.quantity}</p>
            <p><b>Date:</b> {d.preparedDate}</p>

            <p className="mt-2 font-bold">
              Status:{" "}
              <span className={
                d.status === "PENDING" ? "text-orange-600" :
                d.status === "IN TRANSIT" ? "text-blue-600" :
                "text-green-600"
              }>
                {d.status}
              </span>
            </p>
          </div>

          {/* ACTION BUTTONS */}
          {d.status === "PENDING" && (
            <button
              onClick={() => updateStatus(d.id, "IN TRANSIT")}
              className="mt-3 bg-blue-500 text-white px-4 py-1 rounded"
            >
              Accept Delivery
            </button>
          )}

          {d.status === "IN TRANSIT" && (
            <button
              onClick={() => updateStatus(d.id, "DELIVERED")}
              className="mt-3 bg-green-500 text-white px-4 py-1 rounded"
            >
              Mark Delivered
            </button>
          )}

        </div>
      ))}

    </div>
  );
}
