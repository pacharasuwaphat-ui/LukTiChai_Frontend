"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
    
    const [preview, setPreview] = useState(null);
    const [user, setUser] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [form, setForm] = useState({
        username: "",
        email: "",
        phone: "",
        dob: "",
    });

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      setUser(JSON.parse(userString));
    }
  }, []);

    useEffect(() => {
        if (user) {
            setForm({
            username: user.username || "",
            email: user.email || "",
            phone: user.phone || "",
            dob: user.dob || "",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = () => {
        const updatedUser = {
            ...user,
            ...form,
            profileImage: preview || user?.profileImage,
        };

        setUser(updatedUser);
        

        localStorage.setItem("user", JSON.stringify(updatedUser));

        setIsEdit(false);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    
  return (
    <div className="min-h-screen flex justify-center items-center bg-[radial-gradient(circle_at_top,#690dda,#000000)] text-white font-mono p-6">
      
      {/* Card */}
      <div className="w-full max-w-3xl bg-gradient-to-b from-[#0b0f2c] to-[#1b1f4a] rounded-3xl p-8 shadow-2xl relative mt-20" >

        {/* Profile Image */}
        <div className="flex flex-col items-center -mt-20">
          <img
            src={user?.profileImage || "/default-avatar.png"}
            alt="profile"
            className="w-28 h-28 rounded-2xl object-cover bg-gray-300 shadow-xl border-4 border-purple-500"
          />

          <h1 className="text-2xl font-bold mt-4">
            {user?.username || "Luck tichai"}
          </h1>

          <p className="text-gray-300">
            {user?.email || "lucktichai1234@gmail.com"}
          </p>
        </div>

        {/* Personal Info */}
        <div className="mt-8 bg-[#11143a]/70 rounded-2xl p-6 shadow-inner">
          
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Personal Information</h2>
            <button
            onClick={() => setIsEdit(true)}
            className="px-4 py-1 rounded-full bg-indigo-500/40 hover:bg-indigo-500/60 transition"
            >
            Edit
            </button>
          </div>

          <hr className="border-white/10 mb-4" />

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Username :</span>
              <span>{user?.username || "Luck tichai"}</span>
            </div>

            <div className="flex justify-between">
              <span>Email :</span>
              <span className="underline">
                {user?.email || "lucktichai1234@gmail.com"}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Phone :</span>
              <span>{user?.phone || "-"}</span>
            </div>

            <div className="flex justify-between">
              <span>Role :</span>
              <span> User</span>
            </div>

            <div className="flex justify-between">
              <span>Date of birth :</span>
              <span>{user?.dob || "01/01/48"}</span>
            </div>
          </div>
        </div>

        {/* Luck Coin */}
        <div className="mt-6 bg-[#11143a]/70 rounded-2xl p-6 shadow-inner">
          
          <h2 className="text-xl font-bold mb-2">Luck Coin</h2>
          <hr className="border-white/10 mb-4" />

          <div className="flex justify-between items-center">
            <div>
              <span className="mr-2">Coin :</span>
              <span className="font-semibold">
                {user?.coin || 12} Coin
              </span>
            </div>

            <button className="px-5 py-2 rounded-full bg-indigo-500/40 hover:bg-indigo-500/70 transition">
              Add Coin
            </button>
          </div>
        </div>
        

        {/* Footer */}
        <div className="text-center mt-6 text-xs text-white/50">
          © 2026 Luck Ti Chai | พลังแห่งจักรวาลนำทางคุณ
        </div>

      </div>

      {isEdit && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
            
            
            <div className="bg-[#0b0f2c] p-6 rounded-2xl w-full max-w-md shadow-2xl">

            <h2 className="text-xl font-bold mb-4 text-center">
                Edit Profile
            </h2>
            <div className="flex flex-col items-center mb-4">

            <img
                src={preview || user?.profileImage || "/default-avatar.png"}
                className="w-24 h-24 rounded-full object-cover border-2 border-purple-500 mb-2"
            />

            <label className="cursor-pointer text-sm bg-indigo-500/40 px-3 py-1 rounded-lg hover:bg-indigo-500/60 transition">
                Upload Image
                <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                />
            </label>

            </div>

            <div className="space-y-3">

                <input
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full p-2 rounded bg-white/10 outline-none"
                />

                <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-2 rounded bg-white/10 outline-none"
                />

                <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full p-2 rounded bg-white/10 outline-none"
                />

                <input
                type="date"
                max={new Date().toISOString().split("T")[0]}
                name="dob"
                value={form.dob}
                onChange={handleChange}
                placeholder="Date of birth"
                className="w-full p-2 rounded bg-white/10 outline-none"
                />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-5">
                <button
                onClick={() => setIsEdit(false)}
                className="px-4 py-2 bg-gray-500/40 rounded-lg hover:bg-gray-500/60"
                >
                Cancel
                </button>

                <button
                onClick={handleSave}
                className="px-4 py-2 bg-indigo-500 rounded-lg hover:bg-indigo-600"
                >
                Save
                </button>
            </div>

            </div>
        </div>
        )}
    </div>
  );
}