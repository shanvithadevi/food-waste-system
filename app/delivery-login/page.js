 "use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeliveryLogin() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");

    // ❌ validation check
    if (!form.username || !form.password) {
      setError("Enter username and password");
      return;
    }

    // 📦 get registered users
    const users =
      JSON.parse(localStorage.getItem("deliveryUsers")) || [];

    // 🔍 check correct credentials
    const validUser = users.find(
      (u) =>
        u.username === form.username &&
        u.password === form.password
    );

    // ❌ wrong login
    if (!validUser) {
      setError("Invalid username or password");
      return;
    }

    // ✅ login success
    localStorage.setItem("loggedInUser", form.username);

    // 🚚 OPEN DELIVERY VIEW
    router.push("/delivery-view");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-200">

      <div className="bg-white p-6 rounded-xl shadow w-80">

        <h2 className="text-xl font-bold text-center mb-4">
          🚚 Delivery Login
        </h2>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-sm mb-2 text-center">
            {error}
          </p>
        )}

        {/* USERNAME */}
        <input
          placeholder="Username"
          className="w-full p-2 border mb-3 rounded"
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-3 rounded"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          className="w-full bg-purple-500 text-white p-2 rounded"
        >
          Login
        </button>

        {/* REGISTER LINK */}
        <p className="text-sm text-center mt-4">
          Not registered?{" "}
          <span
            className="text-purple-600 underline cursor-pointer"
            onClick={() => router.push("/delivery-register")}
          >
            Register here
          </span>
        </p>

      </div>

    </div>
  );
}