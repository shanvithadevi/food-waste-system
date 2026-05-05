 "use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DonorLogin() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const donors =
      JSON.parse(localStorage.getItem("donors")) || [];

    const user = donors.find(
      (d) =>
        d.username === username &&
        d.password === password
    );

    if (user) {
      localStorage.setItem("loggedInUser", user.username);
      localStorage.setItem(
        "currentDonor",
        JSON.stringify(user)
      );

      // 🚨 FIXED ROUTE (YOUR FOLDER NAME)
      router.push("/food");
    } else {
      setError("Invalid donor username or password");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-blue-100">

      <div className="bg-white p-6 rounded-xl shadow w-80">

        <h1 className="text-2xl font-bold text-center mb-4">
          🍱 Donor Login
        </h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 mb-3 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-500 text-sm text-center mb-2">
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded font-bold"
        >
          Login
        </button>

      </div>

    </main>
  );
}