 "use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DeliveryView() {
  const router = useRouter();

  const [myDeliveries, setMyDeliveries] = useState([]);
  const [allDeliveries, setAllDeliveries] = useState([]);
  const [search, setSearch] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem("loggedInUser");

    if (!username) {
      router.push("/delivery-login");
      return;
    }

    // Get current user's details
    const users = JSON.parse(localStorage.getItem("deliveryUsers")) || [];
    const user = users.find((u) => u.username === username);
    setCurrentUser(user);

    // Get all food requests
    const data = JSON.parse(localStorage.getItem("foodRequests")) || [];

    // Filter deliveries assigned to this user
    const assigned = data.filter((item) => item.assignedTo === username);
    setMyDeliveries(assigned);

    // Get all deliveries that are assigned (with partner info)
    const withPartners = data
      .filter((item) => item.status === "ASSIGNED_TO_DELIVERY")
      .map((item) => ({
        ...item,
        partnerInfo: item.deliveryPartner || {}
      }));

    setAllDeliveries(withPartners);
  }, []);

  // 🔍 SEARCH FILTER
  const filteredMy = myDeliveries.filter(
    (item) =>
      item.foodName?.toLowerCase().includes(search.toLowerCase()) ||
      item.location?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredAll = allDeliveries.filter(
    (item) =>
      item.foodName?.toLowerCase().includes(search.toLowerCase()) ||
      item.location?.toLowerCase().includes(search.toLowerCase()) ||
      item.partnerInfo?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    router.push("/delivery-login");
  };

  return (
    <div className="min-h-screen bg-purple-100 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">🚚 Delivery Dashboard</h1>
          {currentUser && (
            <p className="text-gray-700">
              Welcome, <span className="font-semibold">{currentUser.name}</span>
            </p>
          )}
        </div>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded font-semibold"
        >
          Logout
        </button>
      </div>

      {/* SEARCH */}
      <input
        placeholder="Search food or location or partner"
        className="w-full p-2 border mb-6 rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TWO COLUMN LAYOUT */}
      <div className="grid grid-cols-2 gap-6">
        {/* MY ASSIGNED DELIVERIES */}
        <div>
          <h2 className="text-xl font-bold text-purple-600 mb-4">
            📍 My Assigned Deliveries ({myDeliveries.length})
          </h2>

          {filteredMy.length === 0 ? (
            <p className="text-gray-500">No deliveries assigned to you</p>
          ) : (
            filteredMy.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 mb-4 rounded shadow border-l-4 border-purple-500"
              >
                <h3 className="font-bold text-purple-700">{item.foodName}</h3>
                <p className="text-sm">📦 Quantity: {item.quantity}</p>
                <p className="text-sm">📍 Location: {item.location}</p>
                <p className="text-sm">👤 Donor: {item.name || "Unknown"}</p>
                <p className="text-sm">📞 Phone: {item.phone}</p>
                <p className="text-sm">📅 Prepared: {item.preparedDate}</p>

                <span className="inline-block mt-3 bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold">
                  {item.status}
                </span>
              </div>
            ))
          )}
        </div>

        {/* ALL DELIVERY ASSIGNMENTS */}
        <div>
          <h2 className="text-xl font-bold text-green-600 mb-4">
            🚚 All Delivery Assignments ({allDeliveries.length})
          </h2>

          {filteredAll.length === 0 ? (
            <p className="text-gray-500">No delivery assignments</p>
          ) : (
            filteredAll.map((item) => (
              <div
                key={item.id}
                className="bg-green-50 p-4 mb-4 rounded shadow border-l-4 border-green-500"
              >
                <h3 className="font-bold text-gray-800">{item.foodName}</h3>
                <p className="text-sm">📦 Quantity: {item.quantity}</p>
                <p className="text-sm">📍 Location: {item.location}</p>
                <p className="text-sm">👤 Donor: {item.name || "Unknown"}</p>
                <p className="text-sm">📞 Phone: {item.phone}</p>
                <p className="text-sm">📅 Prepared: {item.preparedDate}</p>

                {item.partnerInfo && (
                  <div className="mt-2 pt-2 border-t border-gray-300">
                    <p className="text-sm font-semibold text-green-700">
                      🚚 Delivery Partner
                    </p>
                    <p className="text-sm">Name: {item.partnerInfo.name}</p>
                    <p className="text-sm">Phone: {item.partnerInfo.mobile}</p>
                    <p className="text-sm">
                      Vehicle: {item.partnerInfo.vehicleType}
                    </p>
                    {item.partnerInfo.company && (
                      <p className="text-sm">Company: {item.partnerInfo.company}</p>
                    )}
                  </div>
                )}

                <span className="inline-block mt-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                  {item.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}