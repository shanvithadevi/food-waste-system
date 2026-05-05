 "use client";
import { useState, useEffect } from "react";

export default function ViewDonations() {
  const [foodList, setFoodList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [deliveryPartners, setDeliveryPartners] = useState([]);
  const [showDeliveryOptions, setShowDeliveryOptions] = useState(false);

  const loadData = () => {
    const data =
      JSON.parse(localStorage.getItem("foodRequests")) || [];

    setFoodList(data);

    const partners =
      JSON.parse(localStorage.getItem("deliveryUsers")) || [];

    setDeliveryPartners(partners);
  };

  useEffect(() => {
    loadData();

    window.addEventListener("focus", loadData);
    return () => window.removeEventListener("focus", loadData);
  }, []);

  // 🚚 ACCEPT FOOD (SHOW MODAL)
  const acceptFood = (food) => {
    setSelectedFood(food);
    setShowModal(true);
    setShowDeliveryOptions(false);
  };

  // Self Pickup
  const handleSelfPickup = () => {
    const data =
      JSON.parse(localStorage.getItem("foodRequests")) || [];

    const updated = data.map((item) =>
      item.id === selectedFood.id
        ? {
            ...item,
            status: "ACCEPTED_SELF_PICKUP"
          }
        : item
    );

    localStorage.setItem(
      "foodRequests",
      JSON.stringify(updated)
    );

    setShowModal(false);
    setSelectedFood(null);
    loadData();
  };

  // Choose Delivery Partner
  const handleChooseDelivery = () => {
    setShowDeliveryOptions(true);
  };

  // Assign to Delivery Partner
  const assignToDelivery = (partner) => {
    const data =
      JSON.parse(localStorage.getItem("foodRequests")) || [];

    const updated = data.map((item) =>
      item.id === selectedFood.id
        ? {
            ...item,
            status: "ASSIGNED_TO_DELIVERY",
            assignedTo: partner.username,
            deliveryPartner: partner
          }
        : item
    );

    localStorage.setItem(
      "foodRequests",
      JSON.stringify(updated)
    );

    setShowModal(false);
    setSelectedFood(null);
    setShowDeliveryOptions(false);
    loadData();
  };

  // Cancel Modal
  const cancelModal = () => {
    setShowModal(false);
    setSelectedFood(null);
    setShowDeliveryOptions(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-2xl font-bold text-center mb-6">
        🏢 NGO View Donations
      </h1>

      <div className="grid grid-cols-2 gap-6">
        {/* AVAILABLE DONATIONS */}
        <div>
          <h2 className="text-xl font-bold text-orange-500 mb-4">🥘 Available Donations</h2>
          {foodList.filter((f) => f.status === "AVAILABLE").length === 0 ? (
            <p className="text-gray-500">No available donations</p>
          ) : (
            foodList
              .filter((f) => f.status === "AVAILABLE")
              .map((food) => (
                <div
                  key={food.id}
                  className="bg-yellow-50 p-4 mb-4 rounded shadow border-l-4 border-orange-500"
                >
                  <h3 className="font-bold text-gray-800">{food.foodName}</h3>
                  <p className="text-sm">📦 Quantity: {food.quantity}</p>
                  <p className="text-sm">📅 Prepared: {food.preparedDate}</p>
                  <p className="text-sm">📍 Location: {food.location}</p>
                  <p className="text-sm">Donor: {food.name || "Unknown"}</p>
                  <p className="text-sm">📞 Phone: {food.phone}</p>
                  <div className="flex gap-2 mt-3">
                    <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      AVAILABLE
                    </span>
                    <button
                      onClick={() => acceptFood(food)}
                      className="bg-green-500 text-white px-3 py-1 rounded text-sm font-semibold hover:bg-green-600"
                    >
                      Accept
                    </button>
                  </div>
                </div>
              ))
          )}
        </div>

        {/* ACCEPTED DONATIONS */}
        <div>
          <h2 className="text-xl font-bold text-green-500 mb-4">✅ Accepted Donations</h2>
          {foodList.filter((f) => f.status !== "AVAILABLE").length === 0 ? (
            <p className="text-gray-500">No accepted donations</p>
          ) : (
            foodList
              .filter((f) => f.status !== "AVAILABLE")
              .map((food) => (
                <div
                  key={food.id}
                  className="bg-green-50 p-4 mb-4 rounded shadow border-l-4 border-green-500"
                >
                  <h3 className="font-bold text-gray-800">{food.foodName}</h3>
                  <p className="text-sm">📦 Quantity: {food.quantity}</p>
                  <p className="text-sm">📅 Prepared: {food.preparedDate}</p>
                  <p className="text-sm">📍 Location: {food.location}</p>
                  <p className="text-sm">Donor: {food.name || "Unknown"}</p>
                  <p className="text-sm">📞 Phone: {food.phone}</p>
                  <span className="inline-block bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold mt-2">
                    DONATED
                  </span>
                  {food.deliveryPartner && (
                    <p className="text-sm mt-2 text-green-700">
                      🚚 Delivery: {food.deliveryPartner.name} ({food.deliveryPartner.mobile})
                    </p>
                  )}
                </div>
              ))
          )}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow w-96">
            <h3 className="text-lg font-bold mb-4">Choose Pickup Option</h3>
            
            {!showDeliveryOptions ? (
              <div className="space-y-2">
                <button
                  onClick={handleSelfPickup}
                  className="w-full bg-blue-500 text-white p-2 rounded"
                >
                  Self Pickup
                </button>
                <button
                  onClick={handleChooseDelivery}
                  className="w-full bg-green-500 text-white p-2 rounded"
                >
                  Choose Delivery Partner
                </button>
                <button
                  onClick={cancelModal}
                  className="w-full bg-gray-500 text-white p-2 rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <h4 className="font-semibold mb-2">Select Delivery Partner:</h4>
                {deliveryPartners.length === 0 ? (
                  <p className="text-gray-500">No delivery partners registered</p>
                ) : (
                  deliveryPartners.map((partner) => (
                    <button
                      key={partner.id}
                      onClick={() => assignToDelivery(partner)}
                      className="w-full text-left p-2 border mb-1 rounded hover:bg-gray-100"
                    >
                      {partner.name} - {partner.mobile} ({partner.vehicleType})
                    </button>
                  ))
                )}
                <button
                  onClick={() => setShowDeliveryOptions(false)}
                  className="w-full bg-gray-500 text-white p-2 rounded mt-2"
                >
                  Back
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}