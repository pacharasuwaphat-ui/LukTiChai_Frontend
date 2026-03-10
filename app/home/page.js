
export default function Home() {

  return (
    <div className="bg-[radial-gradient(circle_at_top,#690dda,#000000)] font-mono text-white min-h-screen flex flex-col items-center scroll-smooth">

      {/* nav bar */}
      <nav className="bg-[#0F1021]/90 backdrop-blur-md border-b border-yellow-500/30 flex justify-between items-center px-10 py-4 w-full">
        <div className="text-yellow-400 font-bold text-lg">
          🔮 Luck Ti Chai
        </div>

        <div>
          <ul className="flex flex-row gap-4 font-bold items-center">
            <li><a className="nav-link" href="#">Home</a></li>
            <li><a className="nav-link" href="#">History</a></li>
            <li><a className="nav-link" href="#">เปิดไพ่</a></li>
            <li><a className="nav-link" href="#">ดูดวงวัน/เดือน/ปีเกิด</a></li>
            <li><a className="nav-link" href="#">สุ่มเซียมซี</a></li>
            <li><a className="nav-link" href="#">ลูกเต๋าพยากรณ์</a></li>
            <li><a className="nav-link" href="#">ทำนายเบอร์โทร</a></li>
            <li><a href="#"><div className="h-10 w-10 rounded-full bg-gray-500 flex justify-center items-center">?</div></a></li>
          </ul>
        </div>
      </nav>

      <section className="text-center pt-24 pb-26 px-5">
        <h1 className="text-4xl font-bold text-yellow-400">🔮 Luck Ti Chai</h1>
        <p className="text-lg font-bold mt-5 mb-8">ค้นพบคำตอบของชีวิตคุณ</p>
        <a href="#types" className="bg-yellow-400 text-black font-bold px-8 py-3 rounded-full hover:bg-white hover:shadow-[0_0_20px_gold] transition">ดูดวงตอนนี้</a>
      </section>

      <section id="types" className="px-5 py-16 text-center font-bold">
        <h2 className="text-2xl mb-10">เลือกรูปแบบการดูดวงที่ต้องการ</h2>
        <div className="flex gap-5">
          <div className="flex-1 flex flex-col items-center gap-3 bg-white/5 rounded-[15px] p-[30px] border border-yellow-500/20 cursor-pointer transition duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-[0_0_25px_rgba(212,175,55,0.6)]"><div className="h-10 w-10 rounded-full bg-yellow-400 flex items-center justify-center mb-2">1</div><a href="#">เปิดไพ่</a></div>
          <div className="flex-1 flex flex-col items-center gap-3 bg-white/5 rounded-[15px] p-[30px] border border-yellow-500/20 cursor-pointer transition duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-[0_0_25px_rgba(212,175,55,0.6)]"><div className="h-10 w-10 rounded-full bg-yellow-400 flex items-center justify-center mb-2">2</div><a href="#">ดูดวง<br/>วัน/เดือน/ปีเกิด</a></div>
          <div className="flex-1 flex flex-col items-center gap-3 bg-white/5 rounded-[15px] p-[30px] border border-yellow-500/20 cursor-pointer transition duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-[0_0_25px_rgba(212,175,55,0.6)]"><div className="h-10 w-10 rounded-full bg-yellow-400 flex items-center justify-center mb-2">3</div><a href="#">สุ่มเซียมซี</a></div>
          <div className="flex-1 flex flex-col items-center gap-3 bg-white/5 rounded-[15px] p-[30px] border border-yellow-500/20 cursor-pointer transition duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-[0_0_25px_rgba(212,175,55,0.6)]"><div className="h-10 w-10 rounded-full bg-yellow-400 flex items-center justify-center mb-2">4</div><a href="#">ลูกเต๋าพยากรณ์</a></div>
          <div className="flex-1 flex flex-col items-center gap-3 bg-white/5 rounded-[15px] p-[30px] border border-yellow-500/20 cursor-pointer transition duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-[0_0_25px_rgba(212,175,55,0.6)]"><div className="h-10 w-10 rounded-full bg-yellow-400 flex items-center justify-center mb-2">5</div><a href="#">ทำนาย<br/>เบอร์โทร</a></div>
        </div> 
      </section>

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
