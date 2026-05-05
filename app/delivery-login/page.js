 "use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeliveryLogin() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const users =
      JSON.parse(localStorage.getItem("deliveryUsers")) || [];

    const validUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (validUser) {
      localStorage.setItem("loggedInUser", username);

      // ✅ Go directly to deliveries
      router.push("/view-deliveries");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-200">
      <div className="bg-white p-6 rounded-xl shadow w-80">

        <h2 className="text-xl font-bold text-center mb-4">
          🚚 Delivery Login
        </h2>

        <input
          placeholder="Username"
          className="w-full p-2 border mb-3"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-3"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>

        <p className="text-sm mt-3 text-center">
          Not registered?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-blue-600 cursor-pointer font-bold"
          >
            Register here
          </span>
        </p>

      </div>
    </div>
  );
}
