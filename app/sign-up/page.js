import Link from "next/link";


export default function SignUp() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">

      <h1 className="text-4xl font-bold mb-10">Luck Ti Chai</h1>

      <div className="flex w-[800px] rounded-3xl shadow-2xl shadow-black/50 overflow-hidden">

        {/* Left - Welcome */}
        <div className="w-1/2 bg-gradient-to-b from-purple-600 to-indigo-900 text-white flex flex-col items-center justify-center p-10">

          <h2 className="text-3xl font-bold mb-3">Welcome Back!</h2>

          <p className="text-center text-sm mb-6">
            Continue Your Fortune Journey
          </p>

          <Link href="/">
            <button className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-purple-700 transition">
              SIGN IN
            </button>
          </Link>

        </div>
        
        {/* Right - Sign Up */}
        <div className="w-1/2 bg-white p-10 flex flex-col items-center">

          <h2 className="text-3xl font-bold mb-5">Sign Up</h2>

          {/* Social */}
          <div className="flex gap-4 mb-5">
            <a href="#"><div className="w-10 h-10 bg-blue-500 rounded-full"></div></a>
            <a href="#"><div className="w-10 h-10 bg-red-500 rounded-full"></div></a>
            <a href="#"><div className="w-10 h-10 bg-pink-500 rounded-full"></div></a>
          </div>

          <p className="text-gray-400 text-sm mb-4">or use your account</p>

          <input
            type="email"
            placeholder="Email Address"
            className="w-full bg-gray-100 rounded-lg px-4 py-2 mb-3 outline-none"
          />

          <input
            type="username"
            placeholder="Username"
            className="w-full bg-gray-100 rounded-lg px-4 py-2 mb-3 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-gray-100 rounded-lg px-4 py-2 mb-2 outline-none"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full bg-gray-100 rounded-lg px-4 py-2 mb-2 outline-none"
          />
          
          <a href="#">
            <button className="mt-2 bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-8 py-2 rounded-full font-bold shadow-lg hover:scale-105 transition">
              SIGN UP
            </button>
          </a>

        </div>

      </div>
    </div>
  );
}