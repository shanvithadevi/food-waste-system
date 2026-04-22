"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface User {
  type: string;
  [key: string]: any;
}

interface SearchResult {
  id: number;
  type: string;
  title: string;
  location: string;
  [key: string]: any;
}

export function LayoutClient({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");
    setCurrentUser(user);
    initializeSampleData();

    // Close search dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.search-container')) {
        setSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const initializeSampleData = () => {
    // Initialize deliveries if not exists
    const deliveries = JSON.parse(localStorage.getItem("deliveries") || "[]");
    if (deliveries.length === 0) {
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
        }
      ];
      localStorage.setItem("deliveries", JSON.stringify(sampleDeliveries));
    }

    // Initialize sample donors if not exists
    const donors = JSON.parse(localStorage.getItem("donors") || "[]");
    if (donors.length === 0) {
      const sampleDonors = [
        {
          name: "John's Pizzeria",
          phone: "+1 555-0123",
          email: "john@pizzeria.com",
          address: "123 Main St, Downtown",
          location: "Downtown",
          username: "johnpizza",
          password: "password123"
        },
        {
          name: "Green Garden Restaurant",
          phone: "+1 555-0456",
          email: "contact@greengarden.com",
          address: "789 Oak St, Uptown",
          location: "Uptown",
          username: "greengarden",
          password: "password123"
        }
      ];
      localStorage.setItem("donors", JSON.stringify(sampleDonors));
    }

    // Initialize sample NGOs if not exists
    const ngos = JSON.parse(localStorage.getItem("ngos") || "[]");
    if (ngos.length === 0) {
      const sampleNGOs = [
        {
          ngoName: "City Food Bank",
          email: "contact@cityfoodbank.org",
          phone: "+1 555-0789",
          address: "456 Charity Ave, Midtown",
          registrationNumber: "NGO001",
          username: "cityfoodbank",
          password: "password123"
        },
        {
          ngoName: "Hope Center",
          email: "info@hopecenter.org",
          phone: "+1 555-0321",
          address: "321 Hope Blvd, Downtown",
          registrationNumber: "NGO002",
          username: "hopecenter",
          password: "password123"
        }
      ];
      localStorage.setItem("ngos", JSON.stringify(sampleNGOs));
    }

    // Initialize sample delivery partners if not exists
    const deliveryPartners = JSON.parse(localStorage.getItem("deliveryPartners") || "[]");
    if (deliveryPartners.length === 0) {
      const sampleDeliveryPartners = [
        {
          name: "Fast Delivery Co",
          phone: "+1 555-0654",
          email: "contact@fastdelivery.com",
          company: "Fast Delivery Company",
          address: "555 Delivery St, Industrial Area",
          city: "Metropolis",
          username: "fastdelivery",
          password: "password123"
        }
      ];
      localStorage.setItem("deliveryPartners", JSON.stringify(sampleDeliveryPartners));
    }
  };

  const hideSidebar = pathname?.includes("/donor-login") || 
                     pathname?.includes("/ngo-login") ||
                     pathname?.includes("/donor-register") ||
                     pathname?.includes("/ngo-register") ||
                     pathname?.includes("/delivery-login") ||
                     pathname?.includes("/delivery-register") ||
                     pathname?.includes("/admin-login");

  const handleSearch = () => {
    const mockResults = [
      { id: 1, type: "food", title: "Pizza Donation", location: "Downtown", donor: "John's Pizzeria" },
      { id: 2, type: "food", title: "Rice & Curry", location: "Uptown", donor: "Indian Restaurant" },
      { id: 3, type: "ngo", title: "City Food Bank", location: "Midtown", contact: "555-0123" }
    ];
    setSearchResults(mockResults.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase())
    ));
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    window.location.href = "/";
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Hidden on certain pages */}
      {!hideSidebar && (
        <div className={`fixed top-0 left-0 h-full bg-gradient-to-b from-white via-gray-50 to-white shadow-2xl p-8 transition-all duration-500 ease-in-out z-50 border-r-4 border-pink-300 overflow-y-auto
          ${open ? (minimized ? "w-20" : "w-96") : "w-0 -translate-x-full opacity-0 overflow-hidden"}`}>

          <div className="flex items-center justify-between mb-10">
            {!minimized && (
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">🍽️</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">FoodShare</h2>
                  <p className="text-sm text-gray-500">Waste Management</p>
                </div>
              </div>
            )}
            <div className="flex gap-2">
              <button
                onClick={() => setMinimized(!minimized)}
                className="text-gray-500 hover:text-gray-700 text-xl hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition"
                title={minimized ? "Expand sidebar" : "Minimize sidebar"}
              >
                {minimized ? "→" : "←"}
              </button>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition"
              >
                ✕
              </button>
            </div>
          </div>

          <nav className="space-y-3">
            <Link href="/" className={`flex items-center gap-3 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 p-3 rounded-xl transition-all duration-300 group block border border-transparent hover:border-pink-200 hover:shadow-md ${minimized ? "justify-center px-2" : ""}`}>
              <span className="text-xl group-hover:scale-110 transition">🏠</span>
              {!minimized && (
                <div>
                  <span className="font-semibold text-gray-800 group-hover:text-pink-600 transition text-sm">Home</span>
                  <p className="text-xs text-gray-500">Main dashboard</p>
                </div>
              )}
            </Link>

            <Link href="/donor-login" className={`flex items-center gap-3 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 p-3 rounded-xl transition-all duration-300 group block border border-transparent hover:border-green-200 hover:shadow-md ${minimized ? "justify-center px-2" : ""}`}>
              <span className="text-xl group-hover:scale-110 transition">👤</span>
              {!minimized && (
                <div>
                  <span className="font-semibold text-gray-800 group-hover:text-green-600 transition text-sm">Donor Login</span>
                  <p className="text-xs text-gray-500">Share your food</p>
                </div>
              )}
            </Link>

            <Link href="/ngo-login" className={`flex items-center gap-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 p-3 rounded-xl transition-all duration-300 group block border border-transparent hover:border-blue-200 hover:shadow-md ${minimized ? "justify-center px-2" : ""}`}>
              <span className="text-xl group-hover:scale-110 transition">🏢</span>
              {!minimized && (
                <div>
                  <span className="font-semibold text-gray-800 group-hover:text-blue-600 transition text-sm">NGO Login</span>
                  <p className="text-xs text-gray-500">Receive donations</p>
                </div>
              )}
            </Link>

            <Link href="/admin-login" className={`flex items-center gap-3 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 p-3 rounded-xl transition-all duration-300 group block border border-transparent hover:border-purple-200 hover:shadow-md ${minimized ? "justify-center px-2" : ""}`}>
              <span className="text-xl group-hover:scale-110 transition">⚙️</span>
              {!minimized && (
                <div>
                  <span className="font-semibold text-gray-800 group-hover:text-purple-600 transition text-sm">Admin Login</span>
                  <p className="text-xs text-gray-500">System management</p>
                </div>
              )}
            </Link>

            <Link href="/search" className={`flex items-center gap-3 hover:bg-gradient-to-r hover:from-pink-50 hover:to-red-50 p-3 rounded-xl transition-all duration-300 group block border border-transparent hover:border-pink-200 hover:shadow-md ${minimized ? "justify-center px-2" : ""}`}>
              <span className="text-xl group-hover:scale-110 transition">🔍</span>
              {!minimized && (
                <div>
                  <span className="font-semibold text-gray-800 group-hover:text-pink-600 transition text-sm">Search</span>
                  <p className="text-xs text-gray-500">Find near me</p>
                </div>
              )}
            </Link>

            <Link href="/delivery-login" className={`flex items-center gap-3 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 p-3 rounded-xl transition-all duration-300 group block border border-transparent hover:border-orange-200 hover:shadow-md ${minimized ? "justify-center px-2" : ""}`}>
              <span className="text-xl group-hover:scale-110 transition">🚚</span>
              {!minimized && (
                <div>
                  <span className="font-semibold text-gray-800 group-hover:text-orange-600 transition text-sm">Delivery Login</span>
                  <p className="text-xs text-gray-500">Partner login</p>
                </div>
              )}
            </Link>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <div className={`flex-1 ${!hideSidebar ? "ml-0" : ""}`}>
        {/* Top Nav - Always visible on all pages */}
        <div className="bg-white shadow-md p-4 flex items-center justify-between sticky top-0 z-40">
          {/* Sidebar Toggle - Only show if sidebar is not hidden */}
          {!hideSidebar && (
            <button
              onClick={() => setOpen(!open)}
              className="text-2xl hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center transition"
              title="Toggle sidebar"
            >
              ☰
            </button>
          )}

          {/* Spacer for pages without sidebar */}
          {hideSidebar && <div className="w-10"></div>}

          {/* Search Bar - Always available */}
          <div className="flex-1 mx-8 search-container relative">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search donations, NGOs, food items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition"
              />
              <button
                onClick={handleSearch}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition font-semibold"
              >
                🔍 Search
              </button>
            </div>

            {/* Search Results Dropdown */}
            {searchOpen && searchResults.length > 0 && (
              <div className="absolute bg-white border-2 border-pink-200 rounded-lg shadow-xl mt-1 w-96 z-50 top-full left-0">
                {searchResults.map((result) => (
                  <Link
                    key={result.id}
                    href="/search"
                    className="block p-4 hover:bg-pink-50 cursor-pointer border-b last:border-b-0"
                    onClick={() => setSearchOpen(false)}
                  >
                    <p className="font-semibold text-gray-800">{result.title}</p>
                    <p className="text-sm text-gray-600">{result.location}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-4">
            {currentUser ? (
              <div className="text-right">
                <p className="font-semibold text-gray-800">{currentUser.type?.toUpperCase()}</p>
                <button
                  onClick={handleLogout}
                  className="text-sm text-pink-600 hover:text-pink-800 font-semibold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <p className="text-gray-600">Not logged in</p>
            )}
            <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
              {currentUser ? currentUser.type?.[0]?.toUpperCase() : "?"}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
