 "use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeliveryRegister() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    vehicle: "",
    company: "",
    username: "",
    password: "",
  });

  const handleRegister = (e) => {
    e.preventDefault();

    const newPartner = {
      id: Date.now(),
      ...form,
    };

    const existing = JSON.parse(localStorage.getItem("partners")) || [];
    const updated = [...existing, newPartner];

    localStorage.setItem("partners", JSON.stringify(updated));

    alert("Registered Successfully!");

    // 👉 Redirect
    router.push("/delivery-view");
  };

  return (
    <main className="p-6 flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded-xl shadow w-96 flex flex-col gap-2">

        <h1 className="text-xl font-bold text-center mb-2">
          Delivery Register
        </h1>

        <input placeholder="Name" onChange={(e)=>setForm({...form,name:e.target.value})} required />
        <input placeholder="Phone" onChange={(e)=>setForm({...form,phone:e.target.value})} required />
        <input placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})} required />
        <input placeholder="Vehicle" onChange={(e)=>setForm({...form,vehicle:e.target.value})} required />
        <input placeholder="Company" onChange={(e)=>setForm({...form,company:e.target.value})} required />

        {/* NEW */}
        <input placeholder="Username" onChange={(e)=>setForm({...form,username:e.target.value})} required />
        <input type="password" placeholder="Password" onChange={(e)=>setForm({...form,password:e.target.value})} required />

        <button className="bg-blue-500 text-white p-2 rounded mt-2">
          Register
        </button>
      </form>
    </main>
  );
}
