 "use client";
import { useState, useEffect } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("donations")) || [];

    const filtered = data.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.location.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filtered);
  }, [query]);

  return (
    <main className="p-6 bg-gradient-to-br from-blue-100 to-purple-100 min-h-screen">
      <div className="max-w-5xl mx-auto">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          🔍 Search Donations
        </h1>

        {/* SEARCH BOX */}
        <div className="bg-white p-4 rounded-xl shadow mb-6 border border-blue-200">
          <input
            type="text"
            placeholder="Search by food name or location..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border-2 border-blue-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
          />
        </div>

        {/* RESULTS */}
        <div className="space-y-4">

          {results.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              No results found
            </div>
          ) : (
            results.map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-xl shadow border-l-4 border-blue-400 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-bold text-blue-700 mb-2">
                  {item.name}
                </h2>

                <div className="text-gray-700 space-y-1 text-sm">
                  <p><span className="font-semibold">Quantity:</span> {item.quantity}</p>
                  <p><span className="font-semibold">Location:</span> {item.location}</p>
                  <p><span className="font-semibold">Phone:</span> {item.phone}</p>
                  <p><span className="font-semibold">Prepared:</span> {item.preparedDate}</p>
                  <p>
                    <span className="font-semibold">Status:</span>{" "}
                    <span className={item.status === "AVAILABLE" ? "text-orange-600" : "text-green-600"}>
                      {item.status}
                    </span>
                  </p>
                </div>

              </div>
            ))
          )}

        </div>

      </div>
    </main>
  );
}
