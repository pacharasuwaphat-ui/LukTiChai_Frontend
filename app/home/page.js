
export default function Home() {

  return (
    <div>

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

      
    </div>
  );
}
