 "use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddFood() {
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
      ...form,
      status: "AVAILABLE"
    };

    const existing =
      JSON.parse(localStorage.getItem("donations")) || [];

    localStorage.setItem(
      "donations",
      JSON.stringify([...existing, newFood])
    );

    alert("Food Added!");

    router.push("/view-donations");
  };

  return (
    <main className="p-6 bg-gradient-to-br from-green-100 to-blue-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow max-w-md w-full">

        <h1 className="text-2xl font-bold text-green-600 mb-4 text-center">
          🍽️ Add Food Donation
        </h1>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            placeholder="Food Name"
            className="w-full border p-2 rounded"
            onChange={(e) => setForm({...form, name: e.target.value})}
          />

          <input
            placeholder="Phone"
            className="w-full border p-2 rounded"
            onChange={(e) => setForm({...form, phone: e.target.value})}
          />

          <input
            placeholder="Quantity"
            className="w-full border p-2 rounded"
            onChange={(e) => setForm({...form, quantity: e.target.value})}
          />

          <input
            placeholder="Location"
            className="w-full border p-2 rounded"
            onChange={(e) => setForm({...form, location: e.target.value})}
          />

          <input
            type="date"
            className="w-full border p-2 rounded"
            onChange={(e) => setForm({...form, preparedDate: e.target.value})}
          />

          <button className="w-full bg-green-500 text-white p-2 rounded font-bold">
            Submit
          </button>

        </form>

      </div>
    </main>
  );
}
