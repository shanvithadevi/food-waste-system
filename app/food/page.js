"use client";
export default function AddFood() {
  return (
    <main className="p-4 bg-gradient-to-br from-green-100 to-blue-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-green-200 max-w-lg w-full backdrop-blur">
        <h1 className="text-3xl font-bold text-green-600 text-center mb-2">🍽️ Add Food Donation</h1>
        <p className="text-center text-gray-500 mb-6 text-sm">Share your surplus food with those in need</p>

        <form className="flex flex-col gap-3">
          <div>
            <label className="block text-green-700 font-semibold mb-1 text-sm">Food Name</label>
            <input type="text" placeholder="e.g., Rice, Biryani, Fruits" className="w-full border-2 border-green-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition bg-green-50 text-sm" required />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-green-700 font-semibold mb-1 text-sm">Phone</label>
              <input type="tel" placeholder="Your contact" className="w-full border-2 border-green-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition bg-green-50 text-sm" required />
            </div>
            <div>
              <label className="block text-green-700 font-semibold mb-1 text-sm">Quantity</label>
              <input type="text" placeholder="e.g., 5 kg" className="w-full border-2 border-green-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition bg-green-50 text-sm" required />
            </div>
          </div>
          
          <div>
            <label className="block text-green-700 font-semibold mb-1 text-sm">Location</label>
            <input type="text" placeholder="Pickup location" className="w-full border-2 border-green-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition bg-green-50 text-sm" required />
          </div>
          
          <div>
            <label className="block text-green-700 font-semibold mb-1 text-sm">Prepared Date</label>
            <input type="date" className="w-full border-2 border-green-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition bg-green-50 text-sm" required />
          </div>

          <button type="submit" className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white p-2 rounded-lg font-bold transition text-sm mt-4 shadow-lg hover:shadow-xl">
            ✓ Submit Donation
          </button>
        </form>
      </div>
    </main>
  );
}