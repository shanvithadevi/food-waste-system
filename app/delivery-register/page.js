 "use client";
import { useState } from "react";

export default function DeliveryRegister() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [company, setCompany] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    const newPartner = {
      id: Date.now(),
      name,
      phone,
      email,
      vehicle,
      company,
    };

    const existing = JSON.parse(localStorage.getItem("partners")) || [];
    const updated = [...existing, newPartner];

    localStorage.setItem("partners", JSON.stringify(updated));

    alert("Delivery Partner Registered!");

    setName("");
    setPhone("");
    setEmail("");
    setVehicle("");
    setCompany("");
  };

  return (
    <main className="p-6 flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">
          Delivery Partner Register
        </h1>

        <form onSubmit={handleRegister} className="flex flex-col gap-3">
          <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name" required />
          <input value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Phone" required />
          <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" required />
          <input value={vehicle} onChange={(e)=>setVehicle(e.target.value)} placeholder="Vehicle" required />
          <input value={company} onChange={(e)=>setCompany(e.target.value)} placeholder="Company" required />

          <button className="bg-blue-500 text-white p-2 rounded">
            Register
          </button>
        </form>
      </div>
    </main>
  );
}
