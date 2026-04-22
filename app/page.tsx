"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [showSections, setShowSections] = useState(false);

  useEffect(() => {
    // Check if admin is logged in and redirect to admin dashboard
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (currentUser && currentUser.type === "admin") {
      window.location.href = "/admin-dashboard";
      return;
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const threshold = 300; // Show sections after scrolling 300px
      setShowSections(scrollTop > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-background-gradient flex items-center justify-center min-h-screen">

      {/* Center Card */}
      <div className="w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-10 text-center border-2 border-pink-200">

        <h1 className="text-5xl font-bold text-pink-600 mb-4">
          Food Waste Optimization System
        </h1>

        <p className="mt-4 text-xl italic text-gray-500 mb-8">
          "Save food, save lives"
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-8 mt-8">
          <Link href="/donor-register">
            <button className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-500 text-white px-8 py-4 rounded-xl shadow-lg font-semibold transition hover:shadow-xl text-lg">
              👤 I am Donor
            </button>
          </Link>

          <Link href="/ngo-register">
            <button className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-500 text-white px-8 py-4 rounded-xl shadow-lg font-semibold transition hover:shadow-xl text-lg">
              🏢 I am NGO
            </button>
          </Link>
        </div>

      </div>

      {/* Sections - Only show when scrolled */}
      {showSections && (
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 px-6 animate-fade-in">

          {/* Left: Advantages */}
          <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-8 rounded-2xl shadow-xl border-2 border-yellow-200 transform hover:scale-105 transition duration-300">
            <h2 className="text-3xl font-semibold text-orange-600 mb-6 text-center">
              🌟 Advantages
            </h2>
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-5xl mb-3">🌍</div>
                <p className="text-gray-700 font-medium">Reduce food waste globally</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-3">🤝</div>
                <p className="text-gray-700 font-medium">Help needy people</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-3">🏢</div>
                <p className="text-gray-700 font-medium">Support NGOs</p>
              </div>
            </div>
          </div>

          {/* Center: Contact Us */}
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-8 rounded-2xl shadow-xl border-2 border-purple-200 transform hover:scale-105 transition duration-300">
            <h2 className="text-3xl font-semibold text-purple-600 mb-6 text-center">
              📞 Contact Us
            </h2>
            <div className="text-center space-y-4">
              <p className="text-gray-700 font-medium">📧 Email: support@foodwaste.com</p>
              <p className="text-gray-700 font-medium">📱 Phone: +1 234 567 890</p>
              <p className="text-gray-700 font-medium">🏠 Address: 123 Food St, City</p>
            </div>
          </div>

          {/* Right: Follow Us */}
          <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-8 rounded-2xl shadow-xl border-2 border-blue-200 transform hover:scale-105 transition duration-300">
            <h2 className="text-3xl font-semibold text-blue-600 mb-6 text-center">
              📱 Follow Us
            </h2>
            <div className="flex justify-center gap-6 mb-6">
              <span className="text-4xl hover:scale-110 transition cursor-pointer">📘</span>
              <span className="text-4xl hover:scale-110 transition cursor-pointer">🐦</span>
              <span className="text-4xl hover:scale-110 transition cursor-pointer">📷</span>
            </div>
            <p className="text-center text-gray-700 font-medium">Stay connected with us on social media</p>
          </div>

        </div>
      )}

    </div>
  );
} 