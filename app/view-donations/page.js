 "use client";
import { useState, useEffect } from "react";

export default function ViewDonations() {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [showPartners, setShowPartners] = useState(false);
  const [donations, setDonations] = useState([]);
  const [deliveryPartners, setDeliveryPartners] = useState([]);
  const [popupMsg, setPopupMsg] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("donations")) || [];
    setDonations(data);

    const partners = JSON.parse(localStorage.getItem("partners")) || [];
    setDeliveryPartners(partners);
  }, []);

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

  const availableFoods = donations.filter((i) => i.status === "AVAILABLE");
  const donatedFoods = donations.filter((i) => i.status === "DONATED");

  return (
    <main className="p-6 bg-gradient-to-br from-blue-100 to-purple-100 min-h-screen">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold text-center mb-6">
          View Donations
        </h1>

        {/* Popup */}
        {popupMsg && (
          <p className="text-green-600 text-center mb-4">{popupMsg}</p>
        )}

        <div className="grid grid-cols-2 gap-6">

          {/* Available */}
          <div>
            <h2>Available Donations</h2>

            {availableFoods.map((food) => (
              <div key={food.id}>
                <p>{food.name}</p>
                <p>{food.quantity}</p>
                <p>{food.location}</p>

                <button onClick={() => handleAccept(food)}>
                  Accept
                </button>
              </div>
            ))}
          </div>

          {/* Donated */}
          <div>
            <h2>Accepted Donations</h2>

            {donatedFoods.map((food) => (
              <div key={food.id}>
                <p>{food.name}</p>
                <p>{food.quantity}</p>
                <p>{food.location}</p>
                <p>NGO: {food.ngo}</p>
              </div>
            ))}
          </div>

        </div>

        {/* Dialog */}
        {showDialog && selectedFood && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

            <div className="bg-white p-6 rounded-xl w-80">

              <h2 className="text-lg font-bold mb-4 text-center">
                Select Delivery
              </h2>

              {!showPartners ? (
                <>
                  <button
                    onClick={() => setShowPartners(true)}
                    className="w-full bg-blue-500 text-white p-2 rounded mb-2"
                  >
                    Choose Delivery Partner
                  </button>

                  <button
                    onClick={() => {
                      setPopupMsg("Self Pickup Selected");
                      setTimeout(() => setPopupMsg(""), 2000);
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
                </>
              ) : (
                <>
                  <button onClick={() => setShowPartners(false)}>
                    ← Back
                  </button>

                  <h3 className="mt-2 mb-2">Partners</h3>

                  {deliveryPartners.map((p) => (
                    <div key={p.id} className="border p-2 mb-2">
                      <p>{p.name}</p>
                      <p>{p.company}</p>

                      <button
                        onClick={() => {
                          setPopupMsg("Driver Selected. Contact via company.");
                          setTimeout(() => setPopupMsg(""), 2500);
                          setShowDialog(false);
                        }}
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                      >
                        Select
                      </button>
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
