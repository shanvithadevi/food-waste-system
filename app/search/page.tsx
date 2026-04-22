"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface SearchResult {
  id: number;
  category: string;
  [key: string]: any;
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("all");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  // Mock data - in a real app, this would come from an API
  const mockData = {
    donors: [
      { id: 1, name: "John's Pizzeria", address: "123 Main St, Downtown", contact: "+1 555-0123", type: "Restaurant", distance: "2.3 km" },
      { id: 2, name: "Green Garden Restaurant", address: "789 Oak St, Uptown", contact: "+1 555-0789", type: "Restaurant", distance: "4.1 km" },
      { id: 3, name: "Bakery Delights", address: "654 Sweet St, Suburb", contact: "+1 555-0654", type: "Bakery", distance: "6.8 km" },
      { id: 4, name: "Fresh Market", address: "321 Market Ave, Downtown", contact: "+1 555-0321", type: "Grocery Store", distance: "1.5 km" }
    ],
    ngos: [
      { id: 1, name: "City Food Bank", address: "456 Charity Ave, Midtown", contact: "+1 555-0456", type: "Food Bank", distance: "3.2 km" },
      { id: 2, name: "Hope Center", address: "321 Hope Blvd, Downtown", contact: "+1 555-0321", type: "Community Center", distance: "2.8 km" },
      { id: 3, name: "Community Kitchen", address: "987 Community Rd, Eastside", contact: "+1 555-0987", type: "Kitchen", distance: "5.4 km" },
      { id: 4, name: "Helping Hands NGO", address: "147 Help St, Westside", contact: "+1 555-0147", type: "Charity", distance: "7.2 km" }
    ],
    deliveries: [
      { id: 1, donor: "John's Pizzeria", ngo: "City Food Bank", food: "Pizza (50 slices)", status: "pending", distance: "5.5 km" },
      { id: 2, donor: "Green Garden Restaurant", ngo: "Hope Center", food: "Vegetarian Meals (30 portions)", status: "in_transit", distance: "6.3 km" },
      { id: 3, donor: "Bakery Delights", ngo: "Community Kitchen", food: "Bread & Pastries (100 pieces)", status: "pending", distance: "8.1 km" }
    ]
  };

  const handleSearch = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let filteredResults: SearchResult[] = [];

      if (searchType === "all" || searchType === "donors") {
        const donorResults = mockData.donors.filter(item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.type.toLowerCase().includes(searchQuery.toLowerCase())
        ).map(item => ({ ...item, category: "donor" }));
        filteredResults = [...filteredResults, ...donorResults];
      }

      if (searchType === "all" || searchType === "ngos") {
        const ngoResults = mockData.ngos.filter(item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.type.toLowerCase().includes(searchQuery.toLowerCase())
        ).map(item => ({ ...item, category: "ngo" }));
        filteredResults = [...filteredResults, ...ngoResults];
      }

      if (searchType === "all" || searchType === "deliveries") {
        const deliveryResults = mockData.deliveries.filter(item =>
          item.donor.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.ngo.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.food.toLowerCase().includes(searchQuery.toLowerCase())
        ).map(item => ({ ...item, category: "delivery" }));
        filteredResults = [...filteredResults, ...deliveryResults];
      }

      setResults(filteredResults);
      setLoading(false);
    }, 500);
  };

  const searchNearMe = (type: string) => {
    setSearchType(type);
    setSearchQuery("");
    // In a real app, this would use geolocation API
    handleSearch();
  };

  useEffect(() => {
    // Load all results initially
    handleSearch();
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "donor": return "👤";
      case "ngo": return "🏢";
      case "delivery": return "🚚";
      default: return "📍";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "donor": return "from-green-400 to-green-500";
      case "ngo": return "from-blue-400 to-blue-500";
      case "delivery": return "from-orange-400 to-orange-500";
      default: return "from-gray-400 to-gray-500";
    }
  };

  return (
    <main className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-600 mb-2">🔍 Advanced Search</h1>
        <p className="text-gray-600 mb-8">Find donors, NGOs, and deliveries near you</p>

        {/* Search Controls */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border-2 border-purple-200">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search for donors, NGOs, or deliveries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-2 border-purple-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition bg-purple-50 text-lg"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="border-2 border-purple-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition bg-purple-50"
              >
                <option value="all">All</option>
                <option value="donors">Donors</option>
                <option value="ngos">NGOs</option>
                <option value="deliveries">Deliveries</option>
              </select>
              <button
                onClick={handleSearch}
                disabled={loading}
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold transition shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                {loading ? "🔄" : "🔍"} Search
              </button>
            </div>
          </div>

          {/* Quick Search Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => searchNearMe("ngos")}
              className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white px-6 py-4 rounded-xl font-bold transition shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              🏢 NGOs Near Me
            </button>
            <button
              onClick={() => searchNearMe("donors")}
              className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white px-6 py-4 rounded-xl font-bold transition shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              👤 Donors Near Me
            </button>
            <button
              onClick={() => searchNearMe("deliveries")}
              className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-6 py-4 rounded-xl font-bold transition shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              🚚 Deliveries Near Me
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔄</div>
              <p className="text-xl text-gray-600">Searching...</p>
            </div>
          ) : results.length > 0 ? (
            results.map((result) => (
              <div key={`${result.category}-${result.id}`} className="bg-white rounded-2xl shadow-xl p-6 border-2 border-purple-200 hover:shadow-2xl transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${getCategoryColor(result.category)} rounded-2xl flex items-center justify-center shadow-lg text-2xl`}>
                      {getCategoryIcon(result.category)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-purple-600">{result.name || `${result.donor} → ${result.ngo}`}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          result.category === "donor" ? "bg-green-100 text-green-800" :
                          result.category === "ngo" ? "bg-blue-100 text-blue-800" :
                          "bg-orange-100 text-orange-800"
                        }`}>
                          {result.category.toUpperCase()}
                        </span>
                      </div>

                      {result.category === "delivery" ? (
                        <div className="space-y-2 text-gray-700">
                          <p><strong>Food:</strong> {result.food}</p>
                          <p><strong>Status:</strong> <span className={`font-semibold ${
                            result.status === "pending" ? "text-yellow-600" :
                            result.status === "in_transit" ? "text-orange-600" :
                            "text-green-600"
                          }`}>{result.status.replace("_", " ").toUpperCase()}</span></p>
                          <p><strong>Distance:</strong> {result.distance}</p>
                        </div>
                      ) : (
                        <div className="space-y-2 text-gray-700">
                          <p><strong>Address:</strong> {result.address}</p>
                          <p><strong>Contact:</strong> {result.contact}</p>
                          <p><strong>Type:</strong> {result.type}</p>
                          <p><strong>Distance:</strong> {result.distance}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl mb-2">📍</div>
                    <p className="text-sm text-gray-500">{result.distance}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-bold text-gray-600 mb-2">No results found</h2>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
