 "use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Food() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    quantity: "",
    location: "",
    preparedDate: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.quantity || !form.location) {
      alert("Fill all fields");
      return;
    }

    const newFood = {
      id: Date.now(),
      foodName: form.name,
      phone: form.phone,
      quantity: form.quantity,
      location: form.location,
      preparedDate: form.preparedDate,
      status: "AVAILABLE",
      assignedTo: null
    };

    const existing =
      JSON.parse(localStorage.getItem("foodRequests")) || [];

    localStorage.setItem(
      "foodRequests",
      JSON.stringify([...existing, newFood])
    );

    alert("🍱 Food Added Successfully!");

    // 🚨 IMPORTANT: NOT view-donations
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded w-96 space-y-3">

        <h1 className="text-xl font-bold text-center">
          🍽️ Add Food Donation
        </h1>

        <input
          placeholder="Food Name"
          className="border p-2 w-full"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Phone"
          className="border p-2 w-full"
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />

        <input
          placeholder="Quantity"
          className="border p-2 w-full"
          onChange={(e) =>
            setForm({ ...form, quantity: e.target.value })
          }
        />

        <input
          placeholder="Location"
          className="border p-2 w-full"
          onChange={(e) =>
            setForm({ ...form, location: e.target.value })
          }
        />

        <input
          type="date"
          className="border p-2 w-full"
          onChange={(e) =>
            setForm({ ...form, preparedDate: e.target.value })
          }
        />

        <button className="bg-green-500 text-white w-full p-2">
          Submit Food
        </button>

      </form>

    </div>
  );
}