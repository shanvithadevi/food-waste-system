 "use client";
import { useState, useEffect } from "react";

export default function ViewDonations() {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [showPartners, setShowPartners] = useState(false);
  const [donations, setDonations] = useState([]);
  const [showAcceptedMsg, setShowAcceptedMsg] = useState(false);

  // Load data
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("donations")) || [];
    setDonations(data);
  }, []);

  // Accept function + popup
  const handleAccept = (id) => {
    const updated = donations.map((item) =>
      item.id === id ? { ...item, status: "DONATED" } : item
    );

    setDonations(updated);
    localStorage.setItem("donations", JSON.stringify(updated));

    // ✅ Popup message
    setShowAcceptedMsg(true);
    setTimeout(() => setShowAcceptedMsg(false), 2000);
  };

  const availableFoods = donations.filter(
    (item) => item.status === "AVAILABLE"
  );

  const donatedFoods = donations.filter(
    (item) => item.status === "DONATED"
  );

  const deliveryPartners = [
    {
      id: 1,
      name: "Madhav Sai",
      phone: "3216549872",
      email: "madhav.sai@gmail.com",
      vehicle: "Car - TS0214000",
      company: "Rapido"
    },
    {
      id: 2,
      name: "Sanjana",
      phone: "3692581472",
      email: "sanjana@gmail.com",
      vehicle: "Car - AP0123EZ",
      company: "Uber"
    }
  ];

  const handleAvailableClick = (food) => {
    setSelectedFood(food);
    setShowDialog(true);
    setShowPartners(false);
  };

  const handleChooseDelivery = () => {
    setShowPartners(true);
  };

  return (
    <main className="p-6 bg-gradient-to-br from-blue-100 to-purple-100 min-h-screen">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
          View Donations
        </h1>

        {/* ✅ Popup message */}
        {showAcceptedMsg && (
          <p className="text-green-600 text-center mb-4">
            Donation accepted successfully!
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Available Donations */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-orange-400">
            <h2 className="text-2xl font-bold text-orange-600 mb-6">
              🎁 Available Donations
            </h2>

            {availableFoods.map((food) => (
              <div key={food.id} className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <div className="font-bold text-orange-800 mb-2">{food.name}</div>

                <p>Quantity: {food.quantity}</p>
                <p>Location: {food.location}</p>
                <p>Phone: {food.phone}</p>
                <p>Prepared: {food.preparedDate}</p>

                <button
                  onClick={() => {
                    handleAvailableClick(food);
                    handleAccept(food.id);
                  }}
                  className="mt-4 w-full bg-orange-400 text-white px-4 py-2 rounded-lg"
                >
                  Accept
                </button>
              </div>
            ))}
          </div>

          {/* Accepted Donations */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-400">
            <h2 className="text-2xl font-bold text-green-600 mb-6">
              ✓ Accepted Donations
            </h2>

            {donatedFoods.map((food) => (
              <div key={food.id} className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="font-bold text-green-800 mb-2">{food.name}</div>

                <p>Quantity: {food.quantity}</p>
                <p>Location: {food.location}</p>
                <p>Phone: {food.phone}</p>
                <p>Prepared: {food.preparedDate}</p>

                <div className="mt-2 bg-green-600 text-white px-3 py-1 rounded-full text-sm inline-block">
                  DONATED
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Dialog (UNCHANGED) */}
        {showDialog && selectedFood && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-80">

              <h2>Select Delivery</h2>

              {!showPartners ? (
                <>
                  <button onClick={handleChooseDelivery}>
                    Choose Delivery Partner
                  </button>

                  <button>Self Pickup</button>

                  <button onClick={() => setShowDialog(false)}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  {deliveryPartners.map((partner) => (
                    <div key={partner.id}>
                      <p>{partner.name}</p>
                      <button>Select</button>
                    </div>
                  ))}
                </>
              )}

            </div>
          </div>
        )}

      </div>
    </main>
  );
}
