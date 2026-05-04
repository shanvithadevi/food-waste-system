 "use client";
import { useState, useEffect } from "react";

export default function ViewDonations() {
  const [donations, setDonations] = useState([]);
  const [partners, setPartners] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [showPartners, setShowPartners] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("donations")) || [];
    setDonations(data);

    const p = JSON.parse(localStorage.getItem("partners")) || [];
    setPartners(p);
  }, []);

  // ACCEPT FOOD
  const handleAccept = (food) => {
    const updated = donations.map((item) =>
      item.id === food.id
        ? { ...item, status: "DONATED", ngo: "Helping NGO" }
        : item
    );

    setDonations(updated);
    localStorage.setItem("donations", JSON.stringify(updated));

    setSelectedFood(food);
    setShowDialog(true);
  };

  // CREATE DELIVERY (IMPORTANT)
  const createDelivery = (driver) => {
    const newDelivery = {
      id: Date.now(),
      driverId: driver.id,
      donorName: selectedFood.name,
      donorPhone: selectedFood.phone,
      foodName: selectedFood.name,
      quantity: selectedFood.quantity,
      location: selectedFood.location,
      ngoName: "Helping NGO",
      status: "pending",
    };

    const existing = JSON.parse(localStorage.getItem("deliveries")) || [];
    localStorage.setItem("deliveries", JSON.stringify([...existing, newDelivery]));

    alert("Driver Assigned Successfully!");

    setShowDialog(false);
    setShowPartners(false);
  };

  const available = donations.filter((d) => d.status === "AVAILABLE");
  const donated = donations.filter((d) => d.status === "DONATED");

  return (
    <main className="p-6 bg-gradient-to-br from-blue-100 to-purple-100 min-h-screen">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold text-center mb-10 text-blue-600">
          View Donations
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          {/* AVAILABLE */}
          <div className="bg-white p-5 rounded-xl shadow border-l-4 border-orange-400">
            <h2 className="text-xl font-bold text-orange-600 mb-4">
              Available Donations
            </h2>

            {available.map((food) => (
              <div key={food.id} className="bg-orange-50 p-4 rounded mb-3 border">

                <p className="font-bold">{food.name}</p>
                <p>Quantity: {food.quantity}</p>
                <p>Location: {food.location}</p>
                <p>Phone: {food.phone}</p>
                <p>Date: {food.preparedDate}</p>

                <button
                  onClick={() => handleAccept(food)}
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
              Accepted Donations
            </h2>

            {donated.map((food) => (
              <div key={food.id} className="bg-green-50 p-4 rounded mb-3 border">

                <p className="font-bold">{food.name}</p>
                <p>Quantity: {food.quantity}</p>
                <p>Location: {food.location}</p>
                <p>Phone: {food.phone}</p>
                <p>Date: {food.preparedDate}</p>
                <p className="text-sm">NGO: {food.ngo}</p>

                <span className="bg-green-600 text-white px-3 py-1 rounded text-sm">
                  DONATED
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* STEP 1: DELIVERY OPTION */}
        {showDialog && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-xl w-80 shadow-lg">

              <h2 className="text-lg font-bold mb-4 text-center">
                Select Delivery Option
              </h2>

              <button
                onClick={() => setShowPartners(true)}
                className="w-full bg-blue-500 text-white p-2 rounded mb-2"
              >
                Choose Delivery Partner
              </button>

              <button
                onClick={() => {
                  alert("Self Pickup Selected");
                  setShowDialog(false);
                }}
                className="w-full bg-green-500 text-white p-2 rounded mb-2"
              >
                Self Pickup
              </button>

              <button
                onClick={() => setShowDialog(false)}
                className="w-full bg-gray-300 p-2 rounded"
              >
                Cancel
              </button>

            </div>
          </div>
        )}

        {/* STEP 2: SELECT DRIVER */}
        {showPartners && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-xl w-80">

              <h2 className="text-lg font-bold mb-3 text-center">
                Select Driver
              </h2>

              {partners.map((p) => (
                <div key={p.id} className="border p-3 mb-2 rounded">
                  <p className="font-bold">{p.name}</p>
                  <p className="text-sm">{p.company}</p>

                  <button
                    onClick={() => createDelivery(p)}
                    className="bg-blue-500 text-white px-2 py-1 mt-2 rounded"
                  >
                    Select
                  </button>
                </div>
              ))}

              <button onClick={() => setShowPartners(false)}>
                Back
              </button>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
