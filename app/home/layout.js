"use client";
import Link from "next/link";
import { useState , useEffect , useRef} from "react";

export default function HomeLayout({ children }) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      setUser(JSON.parse(userString));
    }
  }, []);

  return (
    <div className="bg-[radial-gradient(circle_at_top,#690dda,#000000)] font-mono text-white min-h-screen flex flex-col items-center scroll-smooth">
        {/* nav bar */}
      <nav className="bg-[#0F1021]/90 backdrop-blur-md border-b border-yellow-500/30 flex justify-between items-center px-10 py-4 w-full top-0 z-50">
        <div className="text-yellow-400 font-bold text-lg">
          🔮 Luck Ti Chai
        </div>

        <div>
          <ul className="flex flex-row gap-4 font-bold items-center">
            <li><Link className="nav-link" href="/home">Home</Link></li>
            <li><Link className="nav-link" href="/home/history">History</Link></li>
            <li><Link className="nav-link" href="/fortune/card">เปิดไพ่</Link></li>
            <li><Link className="nav-link" href="/fortune/d-m-y">ดูดวงวัน/เดือน/ปีเกิด</Link></li>
            <li><Link className="nav-link" href="/fortune/siamsi">สุ่มเซียมซี</Link></li>
            <li><Link className="nav-link" href="/fortune/disc">ลูกเต๋าพยากรณ์</Link></li>
            <li><a className="nav-link" href="/fortune/phone">ทำนายเบอร์โทร</a></li>
            <li className="relative" ref={ref}>
              {/* Profile Icon */}
              <div
                onClick={() => setOpen(!open)}
                className="flex flex-col items-center justify-center items-center cursor-pointer hover:scale-105 transition"
              >
              <img
                    src={user?.profileImage || "/default-avatar.png"}
                    alt="profile"
                    className="w-16 h-16 rounded-full object-cover border-2 border-purple-500 shadow-md mb-2"
                  />
              </div>

              {/* Popup */}
              {open && (
                <div className="absolute right-0 mt-4 w-72 bg-gradient-to-b from-[#0b0f2c] to-[#1b1f4a] rounded-2xl shadow-2xl p-6 border border-white/10 z-50">

                  <div className="flex flex-col items-center mb-4">
                  <img
                    src={user?.profileImage || "/default-avatar.png"}
                    alt="profile"
                    className="w-16 h-16 rounded-full object-cover border-2 border-purple-500 shadow-md mb-2"
                  />

                  <h2 className="text-lg font-semibold">
                    {user?.username || "Luck tichai"}
                  </h2>

                  <p className="text-sm text-gray-400">
                    /User
                  </p>
                </div>

                  <hr className="border-white/10 mb-4" />

                  {/* Menu */}
                  <div className="space-y-3">
                    <div className="px-4 py-2 rounded-lg cursor-pointer hover:bg-white/10 transition">
                      <Link href={"/profile"}>Profile </Link>
                    </div>

                    <div className="px-4 py-2 rounded-lg cursor-pointer hover:bg-white/10 transition">
                      <Link href={"/home/history"}>history</Link>
                    </div>

                    <div className="px-4 py-2 rounded-lg cursor-pointer hover:bg-white/10 transition">
                      <Link href={"/about-us"}>About us / Contact us</Link>
                    </div>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>
        {children}
        <footer className="w-full mt-20 border-t border-white/10 pt-10 pb-6 text-sm text-white/80">
        {/* 3 column */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">

          {/* Contact */}
          <div className="text-center">
            <h3 className="font-bold mb-3 text-white">Contact us</h3>
            <p>Phone : 0x-xxx-xxxx</p>
            <p>Facebook : xxxx</p>
          </div>

          {/* Account */}
          <div className="text-center">
            <h3 className="font-bold mb-3 text-white">บัญชี</h3>
            <p className="cursor-pointer hover:text-yellow-400"><Link href="/">เข้าสู่ระบบ</Link></p>
            <p className="cursor-pointer hover:text-yellow-400"><Link href="/home/history">ประวัติการทำนาย</Link></p>
            <p className="cursor-pointer hover:text-yellow-400"><Link href="/sign-up">สมัครใช้งาน</Link></p>
          </div>

          {/* Services */}
          <div className="text-center">
            <h3 className="font-bold mb-3 text-white">Services</h3>
            <p className="cursor-pointer hover:text-yellow-400"><Link href="/about-us">About us</Link></p>
            <p className="cursor-pointer hover:text-yellow-400">github link</p>
          </div>

        </div>

        {/* copyright */}
        <div className="text-center mt-10 text-white/50 text-xs">
          © 2026 Luck Ti Chai | พลังแห่งจักรวาลนำทางคุณ
        </div>

      </footer>
      </div>

  );
}