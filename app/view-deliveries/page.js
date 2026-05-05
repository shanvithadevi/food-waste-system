"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectViewDeliveries() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/delivery-view");
  }, [router]);

  return (
    <main className="p-6 min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center bg-white p-6 rounded-xl shadow-lg">
        <p className="text-lg font-semibold text-gray-700">Redirecting to delivery dashboard...</p>
      </div>
    </main>
  );
}
