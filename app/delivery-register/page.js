 "use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const handleRegister = () => {
    if (!form.username || !form.password) {
      alert("Fill all fields");
      return;
    }

    const users =
      JSON.parse(localStorage.getItem("deliveryUsers")) || [];

    const exists = users.find(u => u.username === form.username);

    if (exists) {
      alert("User already exists");
      return;
    }

    users.push(form);

    localStorage.setItem("deliveryUsers", JSON.stringify(users));

    // ✅ Auto login
    localStorage.setItem("loggedInUser", form.username);

    alert("Registered & Logged in!");

    router.push("/view-deliveries");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-200">
      <div className="bg-white p-6 rounded-xl shadow w-80">

        <h2 className="text-xl font-bold mb-4 text-center">
          🚚 Delivery Register
        </h2>

        <input
          placeholder="Username"
          className="w-full p-2 border mb-3"
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-3"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

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
