"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DeliveryRegister() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    address: "",
    city: "",
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
    const deliveryPartners = JSON.parse(localStorage.getItem("deliveryPartners") || "[]");
    const userExists = deliveryPartners.some(d => d.username === formData.username);
    
    if (userExists) {
      setError("Username already exists");
      return;
    }

    deliveryPartners.push(formData);
    localStorage.setItem("deliveryPartners", JSON.stringify(deliveryPartners));
    localStorage.setItem("currentUser", JSON.stringify({ type: "delivery", username: formData.username }));
    
    router.push("/delivery-view");
  };

  return (
    <main className="p-4 bg-gradient-to-br from-pink-100 to-purple-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-pink-200 max-w-lg w-full backdrop-blur">
        <h1 className="text-3xl font-bold text-pink-600 text-center mb-2">🚚 Delivery Partner</h1>
        <p className="text-center text-gray-500 mb-6 text-sm">Join our delivery network</p>

        {error && <div className="bg-red-100 border-2 border-red-300 text-red-700 px-3 py-2 rounded-lg mb-4 font-medium text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-pink-700 font-semibold mb-1 text-sm">Full Name</label>
              <input 
                type="text" 
                name="name"
                placeholder="Your name" 
                className="w-full border-2 border-pink-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition bg-pink-50 text-sm"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-pink-700 font-semibold mb-1 text-sm">Phone</label>
              <input 
                type="tel" 
                name="phone"
                placeholder="+1 555-1234" 
                className="w-full border-2 border-pink-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition bg-pink-50 text-sm"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-pink-700 font-semibold mb-1 text-sm">Email</label>
            <input 
              type="email" 
              name="email"
              placeholder="you@example.com" 
              className="w-full border-2 border-pink-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition bg-pink-50 text-sm"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label className="block text-pink-700 font-semibold mb-1 text-sm">Company</label>
            <input 
              type="text" 
              name="company"
              placeholder="Your company name" 
              className="w-full border-2 border-pink-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition bg-pink-50 text-sm"
              value={formData.company}
              onChange={handleChange}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-pink-700 font-semibold mb-1 text-sm">Address</label>
              <input 
                type="text" 
                name="address"
                placeholder="Street address" 
                className="w-full border-2 border-pink-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition bg-pink-50 text-sm"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-pink-700 font-semibold mb-1 text-sm">City</label>
              <input 
                type="text" 
                name="city"
                placeholder="Your city" 
                className="w-full border-2 border-pink-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition bg-pink-50 text-sm"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-pink-700 font-semibold mb-1 text-sm">Username</label>
              <input 
                type="text" 
                name="username"
                placeholder="Username" 
                className="w-full border-2 border-pink-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition bg-pink-50 text-sm"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-pink-700 font-semibold mb-1 text-sm">Password</label>
              <input 
                type="password" 
                name="password"
                placeholder="Password" 
                className="w-full border-2 border-pink-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition bg-pink-50 text-sm"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button className="bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white p-2 rounded-lg font-bold transition text-sm mt-4 shadow-lg hover:shadow-xl">
            ✓ Register
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link href="/delivery-login" className="text-pink-600 hover:text-pink-800 text-sm font-semibold">
            Already registered? Login here
          </Link>
        </div>
      </div>
    </main>
  );
}