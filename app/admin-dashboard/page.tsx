  "use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface User {
  type: string;
  [key: string]: any;
}

interface Delivery {
  id: number;
  status: string;
  foodName?: string;
  quantity?: string;
  location?: string;
  phone?: string;
  preparedDate?: string;
  assignedTo?: string;
  deliveryPartner?: {
    name?: string;
    mobile?: string;
    vehicleType?: string;
    company?: string;
  };
  name?: string;
  [key: string]: any;
}

interface Account {
  username: string;
  name?: string;
  ngoName?: string;
  email: string;
  phone: string;
  [key: string]: any;
}

interface Stats {
  totalDeliveries: number;
  pendingDeliveries: number;
  completedDeliveries: number;
  totalDonors: number;
  totalNGOs: number;
}

export default function AdminDashboard() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [accounts, setAccounts] = useState({
    donors: [] as Account[],
    ngos: [] as Account[],
    deliveryPartners: [] as Account[],
  });
  const [stats, setStats] = useState<Stats>({
    totalDeliveries: 0,
    pendingDeliveries: 0,
    completedDeliveries: 0,
    totalDonors: 0,
    totalNGOs: 0,
  });
  const [activeTab, setActiveTab] = useState<"deliveries" | "accounts">("accounts");
  const [accountType, setAccountType] = useState<"donors" | "ngos" | "deliveryPartners">("donors");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (!user || user.type !== "admin") {
      window.location.href = "/admin-login";
      return;
    }
    setCurrentUser(user);

    const foodRequests = JSON.parse(localStorage.getItem("foodRequests") || "[]");
    const storedDeliveries = JSON.parse(localStorage.getItem("deliveries") || "[]");
    const actualDeliveries = foodRequests.length > 0 ? foodRequests : storedDeliveries;
    setDeliveries(actualDeliveries);

    const donors = JSON.parse(localStorage.getItem("donors") || "[]");
    const ngos = JSON.parse(localStorage.getItem("ngos") || "[]");
    const deliveryPartners = JSON.parse(localStorage.getItem("deliveryUsers") || "[]");
    setAccounts({ donors, ngos, deliveryPartners });

    const pending = actualDeliveries.filter((d: Delivery) => d.status !== "DONATED" && d.status !== "completed").length;
    const completed = actualDeliveries.filter((d: Delivery) => d.status === "DONATED" || d.status === "completed").length;

    setStats({
      totalDeliveries: actualDeliveries.length,
      pendingDeliveries: pending,
      completedDeliveries: completed,
      totalDonors: donors.length,
      totalNGOs: ngos.length,
    });
  }, []);

  const deleteAccount = (type: "donors" | "ngos" | "deliveryPartners", username: string) => {
    if (confirm(`Are you sure you want to delete this ${type.slice(0, -1)} account?`)) {
      const updatedAccounts = { ...accounts };
      updatedAccounts[type] = updatedAccounts[type].filter(
        (account: Account) => account.username !== username
      );

      const storageKey = type === "deliveryPartners" ? "deliveryUsers" : type;
      localStorage.setItem(storageKey, JSON.stringify(updatedAccounts[type]));
      setAccounts(updatedAccounts);

      setStats((prev) => ({
        ...prev,
        totalDonors: type === "donors" ? updatedAccounts.donors.length : prev.totalDonors,
        totalNGOs: type === "ngos" ? updatedAccounts.ngos.length : prev.totalNGOs,
      }));
    }
  };

  const updateDeliveryStatus = (id: number, status: string) => {
    const storedFoodRequests = JSON.parse(localStorage.getItem("foodRequests") || "[]");
    const hasFoodRequests = storedFoodRequests.length > 0;

    const updatedDeliveries = (hasFoodRequests ? storedFoodRequests : deliveries).map((delivery: Delivery) =>
      delivery.id === id ? { ...delivery, status } : delivery
    );

    if (hasFoodRequests) {
      localStorage.setItem("foodRequests", JSON.stringify(updatedDeliveries));
    } else {
      localStorage.setItem("deliveries", JSON.stringify(updatedDeliveries));
    }

    setDeliveries(updatedDeliveries);

    const pending = updatedDeliveries.filter((d: Delivery) => d.status !== "DONATED" && d.status !== "completed").length;
    const completed = updatedDeliveries.filter((d: Delivery) => d.status === "DONATED" || d.status === "completed").length;

    setStats((prev) => ({
      ...prev,
      totalDeliveries: updatedDeliveries.length,
      pendingDeliveries: pending,
      completedDeliveries: completed,
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/";
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-black">Admin Dashboard</h1>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
              Logout
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h3 className="text-2xl font-bold text-blue-600">{stats.totalDeliveries}</h3>
            <p className="text-gray-600">Total Deliveries</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h3 className="text-2xl font-bold text-yellow-600">{stats.pendingDeliveries}</h3>
            <p className="text-gray-600">Pending</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h3 className="text-2xl font-bold text-green-600">{stats.completedDeliveries}</h3>
            <p className="text-gray-600">Completed</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h3 className="text-2xl font-bold text-purple-600">{stats.totalDonors}</h3>
            <p className="text-gray-600">Donors</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h3 className="text-2xl font-bold text-pink-600">{stats.totalNGOs}</h3>
            <p className="text-gray-600">NGOs</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex space-x-4 border-b">
            <button
              onClick={() => setActiveTab("deliveries")}
              className={`py-2 px-4 font-semibold ${activeTab === "deliveries" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
            >
              Deliveries
            </button>
            <button
              onClick={() => setActiveTab("accounts")}
              className={`py-2 px-4 font-semibold ${activeTab === "accounts" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
            >
              Accounts Leaderboard
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "deliveries" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-black mb-4">Delivery Management</h2>
            {deliveries.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <p className="text-gray-600">No deliveries found.</p>
              </div>
            ) : (
              deliveries.map((delivery) => (
                <div key={delivery.id} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-black">Delivery #{delivery.id}</h3>
                      <p className="text-gray-600">Status: <span className={`font-semibold ${delivery.status === 'AVAILABLE' ? 'text-yellow-600' : delivery.status === 'ASSIGNED_TO_DELIVERY' ? 'text-blue-600' : 'text-green-600'}`}>{delivery.status}</span></p>
                      <p className="text-gray-600">Food: {delivery.foodName || delivery.food?.type} - {delivery.quantity || delivery.food?.quantity}</p>
                      <p className="text-gray-600">Donor: {delivery.name || delivery.donor?.name || 'Unknown'}</p>
                      <p className="text-gray-600">Phone: {delivery.phone || delivery.donor?.phone || 'N/A'}</p>
                      <p className="text-gray-600">Location: {delivery.location || 'N/A'}</p>
                      <p className="text-gray-600">Prepared: {delivery.preparedDate || delivery.pickupTime || 'N/A'}</p>
                      {delivery.deliveryPartner ? (
                        <div className="mt-2 p-3 rounded-lg bg-gray-50 border border-gray-200">
                          <p className="text-sm font-semibold text-green-700">Delivery Partner Info</p>
                          <p className="text-sm">Name: {delivery.deliveryPartner.name}</p>
                          <p className="text-sm">Phone: {delivery.deliveryPartner.mobile}</p>
                          <p className="text-sm">Vehicle: {delivery.deliveryPartner.vehicleType}</p>
                          {delivery.deliveryPartner.company && <p className="text-sm">Company: {delivery.deliveryPartner.company}</p>}
                        </div>
                      ) : delivery.assignedTo ? (
                        <p className="text-gray-600">Assigned To: {delivery.assignedTo}</p>
                      ) : null}
                    </div>
                    <div className="flex space-x-2">
                      {delivery.status === "pending" && (
                        <button
                          onClick={() => updateDeliveryStatus(delivery.id, "in_transit")}
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                        >
                          Start Delivery
                        </button>
                      )}
                      {delivery.status === "in_transit" && (
                        <button
                          onClick={() => updateDeliveryStatus(delivery.id, "completed")}
                          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                        >
                          Complete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "accounts" && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-black mb-2">🏆 Accounts Leaderboard</h2>
              <p className="text-gray-600">Manage and monitor all registered accounts in the system</p>
            </div>
            <div className="mb-6">
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setAccountType("donors")}
                  className={`py-3 px-6 rounded-lg font-semibold transition ${accountType === "donors" ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg" : "bg-gray-200 text-black hover:bg-gray-300"}`}
                >
                  👤 Donors ({accounts.donors.length})
                </button>
                <button
                  onClick={() => setAccountType("ngos")}
                  className={`py-3 px-6 rounded-lg font-semibold transition ${accountType === "ngos" ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg" : "bg-gray-200 text-black hover:bg-gray-300"}`}
                >
                  🏢 NGOs ({accounts.ngos.length})
                </button>
                <button
                  onClick={() => setAccountType("deliveryPartners")}
                  className={`py-3 px-6 rounded-lg font-semibold transition ${accountType === "deliveryPartners" ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg" : "bg-gray-200 text-black hover:bg-gray-300"}`}
                >
                  🚚 Delivery Partners ({accounts.deliveryPartners.length})
                </button>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
                <h3 className="text-2xl font-bold text-white text-center">
                  {accountType === "donors" ? "Top Donors" : accountType === "ngos" ? "Top NGOs" : "Top Delivery Partners"}
                </h3>
              </div>
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">Rank</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {accounts[accountType].map((account, index) => (
                    <tr key={account.username} className={`hover:bg-gray-50 transition ${index < 3 ? 'bg-gradient-to-r from-yellow-50 to-transparent' : ''}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-black">
                        <div className="flex items-center">
                          {index === 0 && <span className="text-2xl mr-2">🥇</span>}
                          {index === 1 && <span className="text-2xl mr-2">🥈</span>}
                          {index === 2 && <span className="text-2xl mr-2">🥉</span>}
                          {index >= 3 && <span className="text-lg mr-2 font-bold text-black">#{index + 1}</span>}
                          <span className="font-bold">{index + 1}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-black">{account.name || account.ngoName || account.company}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{account.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{account.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => deleteAccount(accountType, account.username)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition shadow-md hover:shadow-lg font-semibold"
                        >
                          🗑️ Delete Account
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {accounts[accountType].length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📊</div>
                  <p className="text-black text-lg">No accounts found in this category.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
