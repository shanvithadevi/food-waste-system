 "use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeliveryLogin() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const partners = JSON.parse(localStorage.getItem("partners")) || [];

    const user = partners.find(
      (p) => p.username === username && p.password === password
    );

    if (user) {
      localStorage.setItem("currentDriver", JSON.stringify(user));
      router.push("/delivery-view");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <main className="p-4 bg-gradient-to-br from-green-100 to-blue-100 min-h-screen flex items-center justify-center">
      
      <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-green-200 max-w-lg w-full">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-green-600 text-center mb-2">
          🚚 Delivery Login
        </h1>

        <p className="text-center text-gray-500 mb-6 text-sm">
          Login to access your deliveries
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-3">

          <div>
            <label className="block text-green-700 font-semibold mb-1 text-sm">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border-2 border-green-300 p-2 rounded-lg bg-green-50 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-green-700 font-semibold mb-1 text-sm">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-green-300 p-2 rounded-lg bg-green-50 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white p-2 rounded-lg font-bold text-sm mt-4 shadow-lg"
          >
            ✓ Login
          </button>

        </form>

        {/* 🔥 IMPORTANT: SIGNUP LINK */}
        <p className="text-center text-sm text-gray-600 mt-5">
          Not registered?{" "}
          <span
            onClick={() => router.push("/delivery-register")}
            className="text-green-600 font-semibold cursor-pointer hover:underline"
          >
            Sign up here
          </span>
        </p>

      </div>

    </main>
  );
}
