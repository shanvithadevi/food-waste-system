"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function SearchPage() {
  const [searchTab, setSearchTab] = useState("ngo");
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [ngos, setNgos] = useState([]);
  const [donors, setDonors] = useState([]);
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    // Load data from localStorage
    const ngoData = JSON.parse(localStorage.getItem("ngos") || "[]");
    const donorData = JSON.parse(localStorage.getItem("donors") || "[]");
    const deliveryData = JSON.parse(localStorage.getItem("deliveries") || "[]");
    
    setNgos(ngoData);
    setDonors(donorData);
    setDeliveries(deliveryData);
  }, []);

  const handleSearch = () => {
    let filteredResults = [];

    if (searchTab === "ngo") {
      filteredResults = ngos.filter(ngo =>
        ngo.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ngo.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ngo.city?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else if (searchTab === "donor") {
      filteredResults = donors.filter(donor =>
        donor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        donor.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        donor.city?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else if (searchTab === "delivery") {
      filteredResults = deliveries.filter(delivery =>
        delivery.donor?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        delivery.ngo?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        delivery.food?.type?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setResults(filteredResults);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-purple-200">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
              Search Near Me
            </h1>
            <p className="text-gray-600 text-lg">Find NGOs, Donors, and Deliveries in your area</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 flex-wrap">
            <button
              onClick={() => setSearchTab("ngo")}
              className={`px-8 py-3 rounded-xl font-bold text-lg transition ${
                searchTab === "ngo"
                  ? "bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              🏢 NGO Near Me
            </button>
            <button
              onClick={() => setSearchTab("donor")}
              className={`px-8 py-3 rounded-xl font-bold text-lg transition ${
                searchTab === "donor"
                  ? "bg-gradient-to-r from-green-400 to-green-500 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              👤 Donor Near Me
            </button>
            <button
              onClick={() => setSearchTab("delivery")}
              className={`px-8 py-3 rounded-xl font-bold text-lg transition ${
                searchTab === "delivery"
                  ? "bg-gradient-to-r from-purple-400 to-purple-500 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              🚚 Delivery Near Me
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder={`Search ${searchTab}s by name or location...`}
                className="flex-1 border-2 border-purple-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-purple-50 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
              <button
                onClick={handleSearch}
                className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition shadow-lg hover:shadow-xl"
              >
                🔍 Search
              </button>
            </div>
          </div>

          {/* Results */}
          <div>
            <h2 className="text-2xl font-bold text-purple-600 mb-6">
              {results.length} Result{results.length !== 1 ? "s" : ""} Found
            </h2>

            {results.length === 0 && searchQuery && (
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6 text-center">
                <p className="text-yellow-800 font-semibold text-lg">No results found for "{searchQuery}"</p>
              </div>
            )}

            <div className="grid gap-6">
              {searchTab === "ngo" && results.map((ngo, index) => (
                <div key={index} className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-200 shadow-lg hover:shadow-xl transition">
                  <h3 className="text-2xl font-bold text-blue-600 mb-3">{ngo.name}</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                    <p><strong>📍 Location:</strong> {ngo.city || ngo.location || "Not specified"}</p>
                    <p><strong>📞 Phone:</strong> {ngo.phone || "Not provided"}</p>
                    <p><strong>📧 Email:</strong> {ngo.email || "Not provided"}</p>
                    <p><strong>👤 Contact:</strong> {ngo.contactPerson || "Not specified"}</p>
                  </div>
                </div>
              ))}

              {searchTab === "donor" && results.map((donor, index) => (
                <div key={index} className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200 shadow-lg hover:shadow-xl transition">
                  <h3 className="text-2xl font-bold text-green-600 mb-3">{donor.name}</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                    <p><strong>📍 Location:</strong> {donor.city || donor.location || "Not specified"}</p>
                    <p><strong>📞 Phone:</strong> {donor.phone || "Not provided"}</p>
                    <p><strong>📧 Email:</strong> {donor.email || "Not provided"}</p>
                    <p><strong>🏪 Business:</strong> {donor.businessType || "Not specified"}</p>
                  </div>
                </div>
              ))}

              {searchTab === "delivery" && results.map((delivery, index) => (
                <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200 shadow-lg hover:shadow-xl transition">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-purple-600">Delivery #{delivery.id}</h3>
                    <span className={`px-4 py-2 rounded-full font-bold ${
                      delivery.status === "pending" ? "bg-yellow-200 text-yellow-800" :
                      delivery.status === "accepted" ? "bg-blue-200 text-blue-800" :
                      delivery.status === "in_transit" ? "bg-orange-200 text-orange-800" :
                      "bg-green-200 text-green-800"
                    }`}>
                      {delivery.status.replace("_", " ").toUpperCase()}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-bold text-green-600 mb-2">👤 Donor</h4>
                      <p className="text-sm"><strong>Name:</strong> {delivery.donor?.name}</p>
                      <p className="text-sm"><strong>Contact:</strong> {delivery.donor?.contact}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-orange-600 mb-2">🍽️ Food</h4>
                      <p className="text-sm"><strong>Type:</strong> {delivery.food?.type}</p>
                      <p className="text-sm"><strong>Quantity:</strong> {delivery.food?.quantity}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-600 mb-2">🏢 NGO</h4>
                      <p className="text-sm"><strong>Name:</strong> {delivery.ngo?.name}</p>
                      <p className="text-sm"><strong>Contact:</strong> {delivery.ngo?.contact}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-8 text-center">
            <Link href="/">
              <button className="bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white px-8 py-3 rounded-xl font-bold transition shadow-lg">
                ← Back to Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
