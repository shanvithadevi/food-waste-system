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
  donor: any;
  food: any;
  ngo: any;
  pickupTime: string;
  deliveryTime: string;
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
    deliveryPartners: [] as Account[]
  });
  const [stats, setStats] = useState<Stats>({
    totalDeliveries: 0,
    pendingDeliveries: 0,
    completedDeliveries: 0,
    totalDonors: 0,
    totalNGOs: 0
  });
  const [activeTab, setActiveTab] = useState<'deliveries' | 'accounts'>('deliveries');
  const [accountType, setAccountType] = useState<'donors' | 'ngos' | 'deliveryPartners'>('donors');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (!user || user.type !== "admin") {
      window.location.href = "/admin-login";
      return;
    }
    setCurrentUser(user);

    // Load deliveries
    const storedDeliveries = JSON.parse(localStorage.getItem("deliveries") || "[]");
    setDeliveries(storedDeliveries);

    // Load accounts
    const donors = JSON.parse(localStorage.getItem("donors") || "[]");
    const ngos = JSON.parse(localStorage.getItem("ngos") || "[]");
    const deliveryPartners = JSON.parse(localStorage.getItem("deliveryPartners") || "[]");
    setAccounts({ donors, ngos, deliveryPartners });

    // Calculate stats
    const pending = storedDeliveries.filter((d: Delivery) => d.status === "pending").length;
    const completed = storedDeliveries.filter((d: Delivery) => d.status === "completed").length;

    setStats({
      totalDeliveries: storedDeliveries.length,
      pendingDeliveries: pending,
      completedDeliveries: completed,
      totalDonors: donors.length,
      totalNGOs: ngos.length
    });
  }, []);

  const deleteAccount = (type: 'donors' | 'ngos' | 'deliveryPartners', username: string) => {
    if (confirm(`Are you sure you want to delete this ${type.slice(0, -1)} account?`)) {
      const updatedAccounts = { ...accounts };
      updatedAccounts[type] = updatedAccounts[type].filter((account: Account) => account.username !== username);
      
      localStorage.setItem(type, JSON.stringify(updatedAccounts[type]));
      setAccounts(updatedAccounts);

      // Update stats
      setStats(prev => ({
        ...prev,
        totalDonors: type === 'donors' ? updatedAccounts.donors.length : prev.totalDonors,
        totalNGOs: type === 'ngos' ? updatedAccounts.ngos.length : prev.totalNGOs
      }));
    }
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
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border-2 border-purple-200">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-3xl">⚙️</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-gray-600">System Administration Panel</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition"
            >
              Logout
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('deliveries')}
              className={`px-6 py-3 font-semibold transition ${
                activeTab === 'deliveries'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              📦 Delivery Management
            </button>
            <button
              onClick={() => setActiveTab('accounts')}
              className={`px-6 py-3 font-semibold transition ${
                activeTab === 'accounts'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              👥 Account Management
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-2xl shadow-xl border-2 border-blue-200">
            <div className="text-center">
              <div className="text-4xl mb-2">📦</div>
              <div className="text-3xl font-bold text-blue-600">{stats.totalDeliveries}</div>
              <div className="text-sm text-blue-700 font-semibold">Total Deliveries</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-100 to-orange-200 p-6 rounded-2xl shadow-xl border-2 border-yellow-200">
            <div className="text-center">
              <div className="text-4xl mb-2">⏳</div>
              <div className="text-3xl font-bold text-orange-600">{stats.pendingDeliveries}</div>
              <div className="text-sm text-orange-700 font-semibold">Pending</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-2xl shadow-xl border-2 border-green-200">
            <div className="text-center">
              <div className="text-4xl mb-2">✅</div>
              <div className="text-3xl font-bold text-green-600">{stats.completedDeliveries}</div>
              <div className="text-sm text-green-700 font-semibold">Completed</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-100 to-pink-200 p-6 rounded-2xl shadow-xl border-2 border-pink-200">
            <div className="text-center">
              <div className="text-4xl mb-2">👤</div>
              <div className="text-3xl font-bold text-pink-600">{stats.totalDonors}</div>
              <div className="text-sm text-pink-700 font-semibold">Donors</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-cyan-100 to-cyan-200 p-6 rounded-2xl shadow-xl border-2 border-cyan-200">
            <div className="text-center">
              <div className="text-4xl mb-2">🏢</div>
              <div className="text-3xl font-bold text-cyan-600">{stats.totalNGOs}</div>
              <div className="text-sm text-cyan-700 font-semibold">NGOs</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {activeTab === 'deliveries' ? (
          /* Delivery Management */
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-purple-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Delivery Management</h2>

            {deliveries.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📦</div>
                <p className="text-gray-600 text-lg">No deliveries found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {deliveries.map((delivery) => (
                  <div key={delivery.id} className="border-2 border-gray-200 rounded-lg p-4 hover:border-purple-300 transition">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            delivery.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            delivery.status === 'in_transit' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {delivery.status.toUpperCase()}
                          </span>
                          <span className="text-sm text-gray-600">ID: {delivery.id}</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="font-semibold text-gray-700">Donor:</p>
                            <p className="text-gray-600">{delivery.donor.name}</p>
                            <p className="text-gray-500">{delivery.donor.address}</p>
                          </div>

                          <div>
                            <p className="font-semibold text-gray-700">Food:</p>
                            <p className="text-gray-600">{delivery.food.type}</p>
                            <p className="text-gray-500">{delivery.food.quantity}</p>
                          </div>

                          <div>
                            <p className="font-semibold text-gray-700">NGO:</p>
                            <p className="text-gray-600">{delivery.ngo.name}</p>
                            <p className="text-gray-500">{delivery.ngo.address}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 ml-4">
                        {delivery.status === 'pending' && (
                          <button
                            onClick={() => updateDeliveryStatus(delivery.id, 'in_transit')}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                          >
                            Start Delivery
                          </button>
                        )}

                        {delivery.status === 'in_transit' && (
                          <button
                            onClick={() => updateDeliveryStatus(delivery.id, 'completed')}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                          >
                            Mark Complete
                          </button>
                        )}

                        {delivery.status === 'completed' && (
                          <span className="bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm font-semibold">
                            ✓ Completed
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Account Management */
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-purple-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Management</h2>

            {/* Account Type Tabs */}
            <div className="flex gap-4 mb-6 border-b border-gray-200">
              <button
                onClick={() => setAccountType('donors')}
                className={`px-4 py-2 font-semibold transition ${
                  accountType === 'donors'
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-600 hover:text-green-600'
                }`}
              >
                👤 Donors ({accounts.donors.length})
              </button>
              <button
                onClick={() => setAccountType('ngos')}
                className={`px-4 py-2 font-semibold transition ${
                  accountType === 'ngos'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                🏢 NGOs ({accounts.ngos.length})
              </button>
              <button
                onClick={() => setAccountType('deliveryPartners')}
                className={`px-4 py-2 font-semibold transition ${
                  accountType === 'deliveryPartners'
                    ? 'text-orange-600 border-b-2 border-orange-600'
                    : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                🚚 Delivery Partners ({accounts.deliveryPartners.length})
              </button>
            </div>

            {/* Accounts List */}
            {accounts[accountType].length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">
                  {accountType === 'donors' ? '👤' : accountType === 'ngos' ? '🏢' : '🚚'}
                </div>
                <p className="text-gray-600 text-lg">No {accountType.replace(/([A-Z])/g, ' $1').toLowerCase()} found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {accounts[accountType].map((account, index) => (
                  <div key={index} className="border-2 border-gray-200 rounded-lg p-4 hover:border-purple-300 transition">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-lg">
                            {accountType === 'donors' ? '👤' : accountType === 'ngos' ? '🏢' : '🚚'}
                          </span>
                          <span className="font-semibold text-gray-800">
                            {account.name || account.ngoName || account.name}
                          </span>
                          <span className="text-sm text-gray-600">@{account.username}</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-semibold text-gray-700">Email:</p>
                            <p className="text-gray-600">{account.email}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-700">Phone:</p>
                            <p className="text-gray-600">{account.phone}</p>
                          </div>
                          {account.address && (
                            <div className="md:col-span-2">
                              <p className="font-semibold text-gray-700">Address:</p>
                              <p className="text-gray-600">{account.address}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="ml-4">
                        <button
                          onClick={() => deleteAccount(accountType, account.username)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                        >
                          🗑️ Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}