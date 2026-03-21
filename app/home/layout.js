import Link from "next/link";

export default function HomeLayout({ children }) {
  return (
    <div className="bg-[radial-gradient(circle_at_top,#690dda,#000000)] font-mono text-white min-h-screen flex flex-col items-center scroll-smooth">
        {/* nav bar */}
      <nav className="bg-[#0F1021]/90 backdrop-blur-md border-b border-yellow-500/30 flex justify-between items-center px-10 py-4 w-full fixed top-0 z-50">
        <div className="text-yellow-400 font-bold text-lg">
          🔮 Luck Ti Chai
        </div>

        <div>
          <ul className="flex flex-row gap-4 font-bold items-center">
            <li><Link className="nav-link" href="/home">Home</Link></li>
            <li><Link className="nav-link" href="/home/history">History</Link></li>
            <li><Link className="nav-link" href="/fortune/card">เปิดไพ่</Link></li>
            <li><Link className="nav-link" href="/fortune-telling">ดูดวงวัน/เดือน/ปีเกิด</Link></li>
            <li><Link className="nav-link" href="/fortune/siamsi">สุ่มเซียมซี</Link></li>
            <li><Link className="nav-link" href="/fortune/disc">ลูกเต๋าพยากรณ์</Link></li>
            <li><a className="nav-link" href="#">ทำนายเบอร์โทร</a></li>
            <li><a href="#"><div className="h-10 w-10 rounded-full bg-gray-500 flex justify-center items-center">?</div></a></li>
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
            <p className="cursor-pointer hover:text-yellow-400">เข้าสู่ระบบ</p>
            <p className="cursor-pointer hover:text-yellow-400">ประวัติการทำนาย</p>
            <p className="cursor-pointer hover:text-yellow-400">สมัครใช้งาน</p>
          </div>

          {/* Services */}
          <div className="text-center">
            <h3 className="font-bold mb-3 text-white">Services</h3>
            <p className="cursor-pointer hover:text-yellow-400">About us</p>
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