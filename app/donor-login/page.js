"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DonorLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    
    const donors = JSON.parse(localStorage.getItem("donors") || "[]");
    const user = donors.find(d => d.username === username && d.password === password);
    
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify({ type: "donor", username: user.username }));
      router.push("/food");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <main className="p-4 bg-gradient-to-br from-green-50 to-blue-50 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-green-200 max-w-md w-full backdrop-blur">
        <h1 className="text-3xl font-bold text-green-600 text-center mb-2">👤 Donor Login</h1>
        <p className="text-center text-gray-500 mb-6 text-sm">Welcome back to share your food</p>

        {error && <div className="bg-red-100 border-2 border-red-300 text-red-700 px-3 py-2 rounded-lg mb-4 font-medium text-sm">{error}</div>}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-green-700 font-semibold mb-1 text-sm">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full border-2 border-green-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition bg-green-50 text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-green-700 font-semibold mb-1 text-sm">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border-2 border-green-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition bg-green-50 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white p-2 rounded-lg font-bold transition text-sm mt-4 shadow-lg hover:shadow-xl">
            ✓ Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4 text-xs">
          Don't have an account? <a href="/donor-register" className="text-green-600 font-bold hover:text-green-700">Register here</a>
        </p>
      </div>
    </main>
  );
}