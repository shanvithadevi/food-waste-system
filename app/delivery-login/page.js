 "use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeliveryLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const partners = JSON.parse(localStorage.getItem("partners")) || [];

    const user = partners.find(
      (p) => p.username === username && p.password === password
    );

    if (user) {
      localStorage.setItem("currentDriver", JSON.stringify(user));
      router.push("/delivery-view");
    } else {
      alert("Invalid login");
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-6 shadow rounded w-80 flex flex-col gap-2">

        <h1 className="text-center font-bold">Delivery Login</h1>

        <input placeholder="Username" onChange={(e)=>setUsername(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />

        <button onClick={handleLogin} className="bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </div>
    </main>
  );
}
