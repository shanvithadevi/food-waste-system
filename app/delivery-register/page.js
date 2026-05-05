 "use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeliveryRegister() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    vehicleType: "",
    company: "",
    username: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleRegister = () => {
    setError("");

    // ❌ validation
    if (
      !form.name ||
      !form.mobile ||
      !form.email ||
      !form.vehicleType ||
      !form.username ||
      !form.password
    ) {
      setError("Please fill all required fields");
      return;
    }

    if (form.password.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }

    // 📦 get existing users
    const users =
      JSON.parse(localStorage.getItem("deliveryUsers")) || [];

    // 🔍 check duplicate username
    const exists = users.find(
      (u) => u.username === form.username
    );

    if (exists) {
      setError("Username already exists");
      return;
    }

    // 💾 save user
    const newUser = {
      id: Date.now(),
      ...form
    };

    localStorage.setItem(
      "deliveryUsers",
      JSON.stringify([...users, newUser])
    );

    // 🔐 auto login
    localStorage.setItem("loggedInUser", form.username);

    alert("Registration successful!");

    router.push("/delivery-view");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-200">

      <div className="bg-white p-6 rounded-xl shadow w-96">

        <h2 className="text-xl font-bold text-center mb-4">
          🚚 Delivery Partner Register
        </h2>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-sm mb-2 text-center">
            {error}
          </p>
        )}

        {/* NAME */}
        <input
          placeholder="Full Name"
          className="w-full p-2 border mb-2 rounded"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        {/* MOBILE */}
        <input
          placeholder="Mobile Number"
          className="w-full p-2 border mb-2 rounded"
          onChange={(e) =>
            setForm({ ...form, mobile: e.target.value })
          }
        />

        {/* EMAIL */}
        <input
          placeholder="Email ID"
          className="w-full p-2 border mb-2 rounded"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        {/* VEHICLE TYPE */}
        <input
          placeholder="Vehicle Type (Bike / Car / Van)"
          className="w-full p-2 border mb-2 rounded"
          onChange={(e) =>
            setForm({ ...form, vehicleType: e.target.value })
          }
        />

        {/* COMPANY */}
        <input
          placeholder="Company Name (optional)"
          className="w-full p-2 border mb-2 rounded"
          onChange={(e) =>
            setForm({ ...form, company: e.target.value })
          }
        />

        {/* USERNAME */}
        <input
          placeholder="Username"
          className="w-full p-2 border mb-2 rounded"
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

        {/* BUTTON */}
        <button
          onClick={handleRegister}
          className="w-full bg-purple-500 text-white p-2 rounded"
        >
          Register
        </button>

      </div>

    </div>
  );
}