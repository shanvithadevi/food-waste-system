"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NGOLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    
    const ngos = JSON.parse(localStorage.getItem("ngos") || "[]");
    const user = ngos.find(n => n.username === username && n.password === password);
    
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify({ type: "ngo", username: user.username }));
      router.push("/view-donations");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <main className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-blue-200 max-w-md w-full backdrop-blur">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-2">🏢 NGO Login</h1>
        <p className="text-center text-gray-500 mb-6 text-sm">Welcome back to receive donations</p>

        {error && <div className="bg-red-100 border-2 border-red-300 text-red-700 px-3 py-2 rounded-lg mb-4 font-medium text-sm">{error}</div>}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-blue-700 font-semibold mb-1 text-sm">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full border-2 border-blue-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-blue-50 text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-blue-700 font-semibold mb-1 text-sm">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border-2 border-blue-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-blue-50 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white p-2 rounded-lg font-bold transition text-sm mt-4 shadow-lg hover:shadow-xl">
            ✓ Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4 text-xs">
          Don't have an account? <a href="/ngo-register" className="text-blue-600 font-bold hover:text-blue-700">Register here</a>
        </p>
      </div>
    </main>
  );
}