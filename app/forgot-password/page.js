"use client";

import { useState } from "react";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // เก็บค่าที่ user พิมพ์ในช่อง email
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  // ส่ง email ไป backend เพื่อขอ reset password
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Send reset email failed");
        return;
      }

      setMessage(data.message || "Reset link sent successfully");
      setEmail("");
    } catch (error) {
      setMessage("Cannot connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-4xl font-bold mb-10">Luck Ti Chai</h1>

      <div className="flex w-[800px] rounded-3xl shadow-2xl shadow-black/50 overflow-hidden">
        <div className="w-1/2 bg-gradient-to-b from-purple-600 to-indigo-900 text-white flex flex-col items-center justify-center p-10">
          <h2 className="text-3xl font-bold mb-3 text-center">
            Forgot your password?
          </h2>

          <p className="text-center text-sm mb-6">
            Enter Email then send and reset password
          </p>
        </div>

        <div className="w-1/2 bg-white p-10 flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-5">Email</h2>

          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-center"
          >
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={handleChange}
              className="w-full bg-gray-100 rounded-lg px-4 py-2 mb-3 outline-none"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-2 bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-8 py-2 rounded-full font-bold shadow-lg hover:scale-105 transition disabled:opacity-50"
            >
              {loading ? "SENDING..." : "SEND"}
            </button>
          </form>

          {message && (
            <p className="text-sm text-center text-red-500 mt-4">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}