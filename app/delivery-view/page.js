 "use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function DeliveryView() {
  const [deliveries, setDeliveries] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const fileInputRef = useRef({});
  const router = useRouter();

  useEffect(() => {
    // ✅ FIX: correct key
    const user = JSON.parse(localStorage.getItem("currentDriver") || "null");

    if (!user) {
      router.push("/delivery-login");
      return;
    }

    setCurrentUser(user);

    // Load deliveries assigned to this driver
    loadDeliveries(user);
  }, [router]);

  const loadDeliveries = (user) => {
    const all = JSON.parse(localStorage.getItem("deliveries")) || [];

    // ✅ show only assigned deliveries
    const myDeliveries = all.filter(d => d.driverId === user.id);

    setDeliveries(myDeliveries);
  };

  // ✅ Accept delivery
  const acceptDelivery = (deliveryId) => {
    const all = JSON.parse(localStorage.getItem("deliveries")) || [];

    const updated = all.map(d =>
      d.id === deliveryId ? { ...d, status: "accepted" } : d
    );

    localStorage.setItem("deliveries", JSON.stringify(updated));
    loadDeliveries(currentUser);
  };

  // ✅ Upload proof
  const handleFileUpload = (deliveryId, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const all = JSON.parse(localStorage.getItem("deliveries")) || [];

      const updated = all.map(d =>
        d.id === deliveryId
          ? {
              ...d,
              proofFile: file.name,
              proofData: event.target?.result,
              status: "delivered", // ✅ mark delivered
            }
          : d
      );

      localStorage.setItem("deliveries", JSON.stringify(updated));
      loadDeliveries(currentUser);
    };

    reader.readAsDataURL(file);
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

        <h1 className="text-4xl font-bold text-purple-600 mb-2">
          🚚 Delivery Dashboard
        </h1>

        <p className="text-gray-600 mb-8">
          Welcome, {currentUser.name}
        </p>

        <div className="grid gap-6">
          {deliveries.map((delivery) => (

            <div key={delivery.id} className="bg-white rounded-2xl shadow-xl border-2 border-purple-200 p-6">

              {/* HEADER */}
              <div className="flex justify-between mb-4">
                <h2 className="text-2xl font-bold text-purple-600">
                  Delivery #{delivery.id}
                </h2>

                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(delivery.status)}`}>
                  {delivery.status}
                </span>
              </div>

              {/* ACTIONS */}
              {delivery.status === "pending" && (
                <button
                  onClick={() => acceptDelivery(delivery.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded mb-3"
                >
                  Accept Delivery
                </button>
              )}

              {(delivery.status === "accepted") && (
                <>
                  <button
                    onClick={() => fileInputRef.current[delivery.id]?.click()}
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
                  >
                    Upload Proof
                  </button>

                  <input
                    type="file"
                    ref={(el) => (fileInputRef.current[delivery.id] = el)}
                    onChange={(e) => handleFileUpload(delivery.id, e)}
                    className="hidden"
                  />
                </>
              )}

              {/* DETAILS */}
              <div className="grid md:grid-cols-3 gap-4">

                <div className="bg-green-50 p-3 rounded">
                  <h3 className="font-bold">Donor</h3>
                  <p>{delivery.donorName}</p>
                  <p>{delivery.donorPhone}</p>
                  <p>{delivery.location}</p>
                </div>

                <div className="bg-orange-50 p-3 rounded">
                  <h3 className="font-bold">Food</h3>
                  <p>{delivery.foodName}</p>
                  <p>{delivery.quantity}</p>
                </div>

                <div className="bg-blue-50 p-3 rounded">
                  <h3 className="font-bold">NGO</h3>
                  <p>{delivery.ngoName}</p>
                </div>

              </div>

              {/* FILE */}
              {delivery.proofFile && (
                <p className="mt-2 text-green-600">
                  ✓ Delivered (Proof Uploaded)
                </p>
              )}

            </div>
          ))}
        </div>

        {deliveries.length === 0 && (
          <p className="text-center mt-10 text-gray-500">
            No deliveries assigned yet
          </p>
        )}

      </div>
    </main>
  );
}
