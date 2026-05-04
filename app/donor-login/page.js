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
    <main className="p-6 bg-gradient-to-br from-blue-100 to-purple-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-blue-200 max-w-md w-full">

        <h1 className="text-3xl font-bold text-blue-600 text-center mb-2">
          🔐 Delivery Login
        </h1>

        <p className="text-center text-gray-500 mb-6 text-sm">
          Login to manage your deliveries
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-3">

          {/* Username */}
          <div>
            <label className="block text-blue-700 font-semibold mb-1 text-sm">
              Username
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border-2 border-blue-300 p-2 rounded-lg bg-blue-50 text-sm"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-blue-700 font-semibold mb-1 text-sm">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-blue-300 p-2 rounded-lg bg-blue-50 text-sm"
              required
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-400 to-blue-500 text-white p-2 rounded-lg font-bold text-sm mt-4"
          >
            ✓ Login
          </button>

        </form>

        {/* ✅ SIGN UP LINK */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Not registered?{" "}
          <span
            onClick={() => router.push("/delivery-register")}
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            Sign up here
          </span>
        </p>

      </div>
    </main>
  );
}
