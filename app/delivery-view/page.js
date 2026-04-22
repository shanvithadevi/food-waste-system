"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function DeliveryView() {
  const [deliveries, setDeliveries] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const fileInputRef = useRef({});
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (!user || user.type !== "delivery") {
      router.push("/delivery-login");
      return;
    }
    setCurrentUser(user);

    // Load or create sample deliveries
    loadDeliveries();
  }, [router]);

  const loadDeliveries = () => {
    let existingDeliveries = JSON.parse(localStorage.getItem("deliveries") || "[]");

    // If no deliveries exist, create sample ones
    if (existingDeliveries.length === 0) {
      const sampleDeliveries = [
        {
          id: 1,
          status: "pending",
          donor: {
            name: "John's Pizzeria",
            address: "123 Main St, Downtown",
            contact: "+1 555-0123",
            email: "john@pizzeria.com"
          },
          food: {
            type: "Pizza",
            quantity: "50 slices",
            description: "Fresh pepperoni and cheese pizzas",
            expiry: "2024-12-25"
          },
          ngo: {
            name: "City Food Bank",
            address: "456 Charity Ave, Midtown",
            contact: "+1 555-0456",
            email: "contact@cityfoodbank.org"
          },
          pickupTime: "2024-12-20 14:00",
          deliveryTime: "2024-12-20 16:00"
        },
        {
          id: 2,
          status: "in_transit",
          donor: {
            name: "Green Garden Restaurant",
            address: "789 Oak St, Uptown",
            contact: "+1 555-0789",
            email: "info@greengarden.com"
          },
          food: {
            type: "Vegetarian Meals",
            quantity: "30 portions",
            description: "Rice, curry, and vegetable dishes",
            expiry: "2024-12-24"
          },
          ngo: {
            name: "Hope Center",
            address: "321 Hope Blvd, Downtown",
            contact: "+1 555-0321",
            email: "help@hopecenter.org"
          },
          pickupTime: "2024-12-19 12:00",
          deliveryTime: "2024-12-19 15:00"
        },
        {
          id: 3,
          status: "pending",
          donor: {
            name: "Bakery Delights",
            address: "654 Sweet St, Suburb",
            contact: "+1 555-0654",
            email: "orders@bakerydelights.com"
          },
          food: {
            type: "Bread & Pastries",
            quantity: "100 pieces",
            description: "Assorted breads, croissants, and muffins",
            expiry: "2024-12-23"
          },
          ngo: {
            name: "Community Kitchen",
            address: "987 Community Rd, Eastside",
            contact: "+1 555-0987",
            email: "kitchen@community.org"
          },
          pickupTime: "2024-12-21 10:00",
          deliveryTime: "2024-12-21 13:00"
        }
      ];
      localStorage.setItem("deliveries", JSON.stringify(sampleDeliveries));
      existingDeliveries = sampleDeliveries;
    }

    setDeliveries(existingDeliveries);
  };

  const acceptDelivery = (deliveryId) => {
    const updatedDeliveries = deliveries.map(delivery =>
      delivery.id === deliveryId
        ? { ...delivery, status: "accepted" }
        : delivery
    );
    setDeliveries(updatedDeliveries);
    localStorage.setItem("deliveries", JSON.stringify(updatedDeliveries));
  };

  const handleFileUpload = (deliveryId, e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const updatedDeliveries = deliveries.map(delivery =>
          delivery.id === deliveryId
            ? { ...delivery, proofFile: file.name, proofData: event.target?.result }
            : delivery
        );
        setDeliveries(updatedDeliveries);
        localStorage.setItem("deliveries", JSON.stringify(updatedDeliveries));
        alert(`File "${file.name}" uploaded successfully!`);
      };
      reader.readAsDataURL(file);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "accepted": return "bg-blue-100 text-blue-800";
      case "in_transit": return "bg-orange-100 text-orange-800";
      case "delivered": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (!currentUser) return null;

  return (
    <main className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-600 mb-2">🚚 Delivery Dashboard</h1>
        <p className="text-gray-600 mb-8">Manage your food deliveries</p>

        <div className="grid gap-6">
          {deliveries.map((delivery) => (
            <div key={delivery.id} className="bg-white rounded-2xl shadow-xl border-2 border-purple-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-purple-600 mb-2">
                    Delivery #{delivery.id}
                  </h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(delivery.status)}`}>
                    {delivery.status.replace("_", " ").toUpperCase()}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  {delivery.status === "pending" && (
                    <button
                      onClick={() => acceptDelivery(delivery.id)}
                      className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white px-6 py-2 rounded-xl font-bold transition shadow-lg hover:shadow-xl"
                    >
                      ✅ Accept Delivery
                    </button>
                  )}
                  {(delivery.status === "accepted" || delivery.status === "in_transit") && (
                    <>
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          ref={(el) => (fileInputRef.current[delivery.id] = el)}
                          onChange={(e) => handleFileUpload(delivery.id, e)}
                          className="hidden"
                          accept="image/*,.pdf"
                        />
                        <button
                          onClick={() => fileInputRef.current[delivery.id]?.click()}
                          className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white px-6 py-2 rounded-xl font-bold transition shadow-lg hover:shadow-xl w-full"
                        >
                          📄 {delivery.proofFile ? "Change Proof" : "Add Proof File"}
                        </button>
                      </label>
                      {delivery.proofFile && (
                        <p className="text-sm text-blue-600 font-semibold">✓ File: {delivery.proofFile}</p>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Donor Information */}
                <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                  <h3 className="text-lg font-bold text-green-600 mb-3">👤 Donor Details</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Name:</strong> {delivery.donor.name}</p>
                    <p><strong>Address:</strong> {delivery.donor.address}</p>
                    <p><strong>Contact:</strong> {delivery.donor.contact}</p>
                    <p><strong>Email:</strong> {delivery.donor.email}</p>
                  </div>
                </div>

                {/* Food Information */}
                <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                  <h3 className="text-lg font-bold text-orange-600 mb-3">🍽️ Food Details</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Type:</strong> {delivery.food.type}</p>
                    <p><strong>Quantity:</strong> {delivery.food.quantity}</p>
                    <p><strong>Description:</strong> {delivery.food.description}</p>
                    <p><strong>Expiry:</strong> {delivery.food.expiry}</p>
                  </div>
                </div>

                {/* NGO Information */}
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <h3 className="text-lg font-bold text-blue-600 mb-3">🏢 NGO Details</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Name:</strong> {delivery.ngo.name}</p>
                    <p><strong>Address:</strong> {delivery.ngo.address}</p>
                    <p><strong>Contact:</strong> {delivery.ngo.contact}</p>
                    <p><strong>Email:</strong> {delivery.ngo.email}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm text-gray-600">
                  <span><strong>Pickup Time:</strong> {delivery.pickupTime}</span>
                  <span><strong>Delivery Time:</strong> {delivery.deliveryTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {deliveries.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-gray-600 mb-2">No deliveries assigned</h2>
            <p className="text-gray-500">Check back later for new delivery assignments</p>
          </div>
        )}
      </div>
    </main>
  );
}