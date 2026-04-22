"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DonorRegister() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    location: "",
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      setError("Username and password are required");
      return;
    }

    // Save to localStorage
    const donors = JSON.parse(localStorage.getItem("donors") || "[]");
    const userExists = donors.some(d => d.username === formData.username);
    
    if (userExists) {
      setError("Username already exists");
      return;
    }

    donors.push(formData);
    localStorage.setItem("donors", JSON.stringify(donors));
    localStorage.setItem("currentUser", JSON.stringify({ type: "donor", username: formData.username }));
    
    router.push("/food");
  };

  return (
    <main className="p-4 bg-gradient-to-br from-green-50 to-yellow-50 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-green-200 max-w-lg w-full backdrop-blur">
        <h1 className="text-3xl font-bold text-green-600 text-center mb-2">👤 Donor</h1>
        <p className="text-center text-gray-500 mb-6 text-sm">Create your account to share food</p>

        {error && <div className="bg-red-100 border-2 border-red-300 text-red-700 px-3 py-2 rounded-lg mb-4 font-medium text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-green-700 font-semibold mb-1 text-sm">Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" className="w-full border-2 border-green-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition bg-green-50 text-sm" required />
            </div>
            <div>
              <label className="block text-green-700 font-semibold mb-1 text-sm">Phone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 555-1234" className="w-full border-2 border-green-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition bg-green-50 text-sm" required />
            </div>
          </div>
          
          <div>
            <label className="block text-green-700 font-semibold mb-1 text-sm">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className="w-full border-2 border-green-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition bg-green-50 text-sm" required />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-green-700 font-semibold mb-1 text-sm">Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Street address" className="w-full border-2 border-green-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition bg-green-50 text-sm" required />
            </div>
            <div>
              <label className="block text-green-700 font-semibold mb-1 text-sm">City</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Your city" className="w-full border-2 border-green-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition bg-green-50 text-sm" required />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-green-700 font-semibold mb-1 text-sm">Username</label>
              <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" className="w-full border-2 border-green-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition bg-green-50 text-sm" required />
            </div>
            <div>
              <label className="block text-green-700 font-semibold mb-1 text-sm">Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="w-full border-2 border-green-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition bg-green-50 text-sm" required />
            </div>
          </div>

          <button type="submit" className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white p-2 rounded-lg font-bold transition text-sm mt-4 shadow-lg hover:shadow-xl">
            ✓ Register & Continue
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4 text-xs">
          Already have an account? <a href="/donor-login" className="text-green-600 font-bold hover:text-green-700">Login here</a>
        </p>
      </div>
    </main>
  );
}
