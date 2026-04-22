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

    const storedDeliveries = JSON.parse(localStorage.getItem("deliveries") || "[]");
    setDeliveries(storedDeliveries);

    const donors = JSON.parse(localStorage.getItem("donors") || "[]");
    const ngos = JSON.parse(localStorage.getItem("ngos") || "[]");
    const deliveryPartners = JSON.parse(localStorage.getItem("deliveryPartners") || "[]");
    setAccounts({ donors, ngos, deliveryPartners });

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

  // ✅ FIX ADDED HERE
  const updateDeliveryStatus = (id: number, newStatus: string) => {
    const updatedDeliveries = deliveries.map((delivery) =>
      delivery.id === id ? { ...delivery, status: newStatus } : delivery
    );

    setDeliveries(updatedDeliveries);
    localStorage.setItem("deliveries", JSON.stringify(updatedDeliveries));

    const pending = updatedDeliveries.filter(d => d.status === "pending").length;
    const completed = updatedDeliveries.filter(d => d.status === "completed").length;

    setStats(prev => ({
      ...prev,
      totalDeliveries: updatedDeliveries.length,
      pendingDeliveries: pending,
      completedDeliveries: completed
    }));
  };

  const deleteAccount = (type: 'donors' | 'ngos' | 'deliveryPartners', username: string) => {
    if (confirm(`Are you sure you want to delete this ${type.slice(0, -1)} account?`)) {
      const updatedAccounts = { ...accounts };
      updatedAccounts[type] = updatedAccounts[type].filter((account: Account) => account.username !== username);

      localStorage.setItem(type, JSON.stringify(updatedAccounts[type]));
      setAccounts(updatedAccounts);

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

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
              Logout
            </button>
          </div>

          <div className="flex gap-4">
            <button onClick={() => setActiveTab('deliveries')}>Deliveries</button>
            <button onClick={() => setActiveTab('accounts')}>Accounts</button>
          </div>
        </div>

        {activeTab === 'deliveries' && (
          <div>
            {deliveries.map((delivery) => (
              <div key={delivery.id} className="border p-4 mb-2">
                <p>Status: {delivery.status}</p>

                {delivery.status === 'pending' && (
                  <button onClick={() => updateDeliveryStatus(delivery.id, 'in_transit')}>
                    Start Delivery
                  </button>
                )}

                {delivery.status === 'in_transit' && (
                  <button onClick={() => updateDeliveryStatus(delivery.id, 'completed')}>
                    Complete
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}