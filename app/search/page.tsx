"use client";
import { useState, useEffect, useMemo } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const donations =
      JSON.parse(localStorage.getItem("foodRequests") || "[]");

    const donors =
      JSON.parse(localStorage.getItem("donors") || "[]");

    const ngos =
      JSON.parse(localStorage.getItem("ngos") || "[]");

    const deliveryPartners =
      JSON.parse(localStorage.getItem("deliveryPartners") || "[]");

    const allData = [
      ...donations.map((d: any) => ({
        ...d,
        category: "food",
        displayName: d.foodName || d.name,
        searchText: `${d.foodName || d.name} ${d.location} ${d.quantity} ${d.phone}`
      })),

      ...donors.map((d: any) => ({
        ...d,
        category: "donor",
        displayName: d.name,
        searchText: `${d.name} ${d.location} ${d.phone} ${d.email}`
      })),

      ...ngos.map((n: any) => ({
        ...n,
        category: "ngo",
        displayName: n.ngoName,
        searchText: `${n.ngoName} ${n.address} ${n.phone} ${n.email}`
      })),

      ...deliveryPartners.map((p: any) => ({
        ...p,
        category: "delivery",
        displayName: p.name,
        searchText: `${p.name} ${p.city} ${p.phone} ${p.email}`
      }))
    ];

    setData(allData);
  }, []);

  // 🔍 FILTER RESULTS
  const results = data.filter((item) =>
    item.searchText
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <main className="p-6 bg-gradient-to-br from-blue-100 to-purple-100 min-h-screen">

      <div className="max-w-5xl mx-auto">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          🔍 Search System
        </h1>

        {/* SEARCH BOX */}
        <div className="bg-white p-4 rounded-xl shadow mb-6 border border-blue-200">

          <input
            type="text"
            placeholder="Search donors, NGOs, delivery, food..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* RESULTS */}
        <div className="space-y-4">

          {results.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              No results found
            </div>
          ) : (
            results.map((item, index) => (
              <div
                key={item.id || index}
                className="bg-white p-5 rounded-xl shadow border-l-4 border-blue-400"
              >

                {/* HEADER */}
                <div className="flex justify-between items-center mb-2">

                  <h2 className="text-xl font-bold text-blue-700">
                    {item.displayName}
                  </h2>

                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    item.category === "food"
                      ? "bg-orange-200 text-orange-800"
                      : item.category === "donor"
                      ? "bg-green-200 text-green-800"
                      : item.category === "ngo"
                      ? "bg-purple-200 text-purple-800"
                      : "bg-blue-200 text-blue-800"
                  }`}>
                    {item.category.toUpperCase()}
                  </span>

                </div>

                {/* DETAILS */}
                <div className="text-sm text-gray-700 space-y-1">

                  {Object.entries(item)
                    .filter(([key]) =>
                      !["searchText", "category", "displayName"].includes(key)
                    )
                    .map(([key, value]: [string, any]) => (
                      <p key={key}>
                        <span className="font-semibold">{key}:</span> {String(value)}
                      </p>
                    ))}

                </div>

              </div>
            ))
          )}

        </div>

      </div>
    </main>
  );
}
