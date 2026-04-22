"use client";
import { useState } from "react";

export default function ViewDonations() {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [showPartners, setShowPartners] = useState(false);

  const availableFoods = [
    {
      id: 1,
      name: "Biryani Rice",
      quantity: "5 kg",
      location: "Ibnagar",
      donor: "Alekhya",
      phone: "9583587421",
      preparedDate: "2026-04-11",
      status: "AVAILABLE"
    },
    {
      id: 2,
      name: "Roti, Dal, Fruits",
      quantity: "5.5 kg",
      location: "Sagar Ring Road",
      donor: "Alekhya",
      phone: "9583587421",
      preparedDate: "2026-04-12",
      status: "AVAILABLE"
    }
  ];

  const donatedFoods = [
    {
      id: 3,
      name: "Noodles",
      quantity: "9 kg",
      location: "Prakash Paradise, Vanathalipuram",
      donor: "Shivani",
      phone: "3265982154",
      preparedDate: "2026-02-13",
      status: "DONATED"
    },
    {
      id: 4,
      name: "Baggar Rice",
      quantity: "6 kg",
      location: "Prakash Paradise, Vanathalipuram",
      donor: "Nandika Homes",
      phone: "3265982154",
      preparedDate: "2026-04-10",
      status: "DONATED"
    }
  ];

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
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-10">View Donations</h1>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Available Donations */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-orange-400">
            <h2 className="text-2xl font-bold text-orange-600 mb-6 flex items-center">
              🎁 Available Donations
            </h2>
            <div className="space-y-4">
              {availableFoods.map((food) => (
                <div key={food.id} className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <div className="font-bold text-orange-800 mb-2">{food.name}</div>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p><span className="font-semibold">Quantity:</span> {food.quantity}</p>
                    <p><span className="font-semibold">Location:</span> {food.location}</p>
                    <p><span className="font-semibold">Donor:</span> {food.donor}</p>
                    <p><span className="font-semibold">Phone:</span> {food.phone}</p>
                    <p><span className="font-semibold">Prepared:</span> {food.preparedDate}</p>
                  </div>
                  <button
                    onClick={() => handleAvailableClick(food)}
                    className="mt-4 w-full bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold transition"
                  >
                    Accept
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Accepted/Donated */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-400">
            <h2 className="text-2xl font-bold text-green-600 mb-6 flex items-center">
              ✓ Accepted Donations
            </h2>
            <div className="space-y-4">
              {donatedFoods.map((food) => (
                <div key={food.id} className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="font-bold text-green-800 mb-2">{food.name}</div>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p><span className="font-semibold">Quantity:</span> {food.quantity}</p>
                    <p><span className="font-semibold">Location:</span> {food.location}</p>
                    <p><span className="font-semibold">Donor:</span> {food.donor}</p>
                    <p><span className="font-semibold">Phone:</span> {food.phone}</p>
                    <p><span className="font-semibold">Prepared:</span> {food.preparedDate}</p>
                  </div>
                  <div className="mt-4 inline-block bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    DONATED
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Delivery Modal Dialog */}
        {showDialog && selectedFood && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">Select Delivery Option</h2>
              
              {!showPartners ? (
                <div className="space-y-4">
                  <p className="text-gray-700 mb-6">How would you like to receive <strong>{selectedFood.name}</strong>?</p>
                  
                  <button
                    onClick={handleChooseDelivery}
                    className="w-full bg-blue-400 hover:bg-blue-500 text-white p-4 rounded-lg font-semibold transition text-lg"
                  >
                    Choose Delivery Partner
                  </button>
                  
                  <button
                    className="w-full bg-green-400 hover:bg-green-500 text-white p-4 rounded-lg font-semibold transition text-lg"
                  >
                    Self Pickup
                  </button>
                  
                  <button
                    onClick={() => setShowDialog(false)}
                    className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 p-4 rounded-lg font-semibold transition"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <button
                    onClick={() => setShowPartners(false)}
                    className="text-blue-600 font-semibold mb-4"
                  >
                    ← Back
                  </button>
                  
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Available Delivery Partners</h3>
                  
                  {deliveryPartners.map((partner) => (
                    <div key={partner.id} className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-gray-800">{partner.name}</div>
                          <div className="text-sm text-gray-600">{partner.company}</div>
                          <div className="text-sm text-gray-600">{partner.vehicle}</div>
                        </div>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition">
                          Select
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}