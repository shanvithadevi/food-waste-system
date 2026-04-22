"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DeliveryLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    
    const deliveryPartners = JSON.parse(localStorage.getItem("deliveryPartners") || "[]");
    const user = deliveryPartners.find(d => d.username === username && d.password === password);
    
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify({ type: "delivery", username: user.username }));
      router.push("/delivery-view");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <main className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-purple-200 max-w-md w-full backdrop-blur">
        <h1 className="text-3xl font-bold text-purple-600 text-center mb-2">🚚 Delivery Partner Login</h1>
        <p className="text-center text-gray-500 mb-6 text-sm">Access your delivery dashboard</p>

        {error && <div className="bg-red-100 border-2 border-red-300 text-red-700 px-3 py-2 rounded-lg mb-4 font-medium text-sm">{error}</div>}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-purple-700 font-semibold mb-1 text-sm">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full border-2 border-purple-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition bg-purple-50 text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-purple-700 font-semibold mb-1 text-sm">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border-2 border-purple-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition bg-purple-50 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white p-2 rounded-lg font-bold transition text-sm mt-4 shadow-lg hover:shadow-xl">
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link href="/delivery-register" className="text-purple-600 hover:text-purple-800 text-sm font-semibold">
            Not registered? Sign up here
          </Link>
        </div>

        <div className="mt-4 text-center text-xs text-gray-500">
          Sample delivery credentials:<br/>
          <strong>Username:</strong> alex_delivery<br/>
          <strong>Password:</strong> password123
        </div>
      </div>
    </main>
  );
}