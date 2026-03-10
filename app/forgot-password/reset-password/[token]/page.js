"use client";

import { use , useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPassword( { params }) {

  const router = useRouter();

  // token ที่ได้จาก URL
  const { token } = use(params);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


  // update input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  // submit reset password
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Password does not match");
      return;
    }

    setLoading(true);

    try {

      const res = await fetch("http://localhost:4000/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          newPassword: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Reset password failed");
        return;
      }

      setMessage("Password reset successful");

      // กลับไปหน้า login
      setTimeout(() => {
        router.push("/");
      }, 1000);

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

        {/* Left */}
        <div className="w-1/2 bg-gradient-to-b from-purple-600 to-indigo-900 text-white flex flex-col items-center justify-center p-10">

          <h2 className="text-3xl font-bold mb-3 text-center">
            Reset your password
          </h2>

          <p className="text-center text-sm mb-6">
            Enter your new password
          </p>

        </div>


        {/* Right */}
        <div className="w-1/2 bg-white p-10 flex flex-col items-center">

          <h2 className="text-3xl font-bold mb-5">
            New Password
          </h2>

          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-gray-100 rounded-lg px-4 py-2 mb-3 outline-none"
            />

            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full bg-gray-100 rounded-lg px-4 py-2 mb-3 outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-2 bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-8 py-2 rounded-full font-bold shadow-lg hover:scale-105 transition disabled:opacity-50"
            >
              {loading ? "CONFIRMING..." : "Confirm"}
            </button>

          </form>

          {message && (
            <p className="text-sm text-red-500 mt-4 text-center">
              {message}
            </p>
          )}

        </div>

      </div>

    </div>
  );
}