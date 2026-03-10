
export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">

      <h1 className="text-4xl font-bold mb-10">Luck Ti Chai</h1>

      <div className="flex w-[800px] rounded-3xl shadow-2xl shadow-black/50 overflow-hidden">

        {/* Left - Check Email */}
        <div className="w-1/2 bg-gradient-to-b from-purple-600 to-indigo-900 text-white flex flex-col items-center justify-center p-10">

          <h2 className="text-3xl font-bold mb-3 text-center">Check your email!</h2>

          <p className="text-center text-sm mb-6">
            We’ve sent a password reset link to your email. Please check your inbox.
          </p>

        </div>
        
        {/* Right - Reset Password */}
        <div className="w-1/2 bg-white p-10 flex flex-col items-center">

          <h2 className="text-3xl font-bold mb-5">Reset your password</h2>

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-gray-100 rounded-lg px-4 py-2 mb-3 outline-none"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full bg-gray-100 rounded-lg px-4 py-2 mb-3 outline-none"
          />
          
          <a href="#">
            <button className="mt-2 bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-8 py-2 rounded-full font-bold shadow-lg hover:scale-105 transition">
              Confirm
            </button>
          </a>

        </div>

      </div>
    </div>
  );
}