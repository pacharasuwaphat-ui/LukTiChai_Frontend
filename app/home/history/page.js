"use client";

import { useState, useEffect } from "react";

export default function Home() {

  {/* ลบตรงนี้ออกด้วย ตัวอย่างนี้แค่ทดสอบเท่านั้น ท่านดึงจาก api มายังไงก็แล้วแต่ท่านเลย */}
  const history = [
    {
      id: 1,
      title: "ดูดวงแบบ : เปิดไพ่",
      date: "2024/08/13 13:02",
      image: "/tarot.png"
    },
    {
      id: 2,
      title: "ดูดวงแบบ : ลูกเต๋าพยากรณ์",
      date: "2024/08/13 12:08",
      image: "/dice.png"
    },
    {
      id: 3,
      title: "ดูดวงแบบ : สุ่มเซียมซี",
      date: "2024/08/12 07:29",
      image: "/sticks.png"
    }
  ];

  return (
    <div className="bg-[radial-gradient(circle_at_top,#690dda,#000000)] font-mono text-white min-h-screen flex flex-col items-center">

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

      <section className="mt-10">
        <h1 className="text-5xl font-bold text-left">History</h1>
        <div className="flex flex-col gap-6 mt-6">

          {history.map((item) => (
            <div
              key={item.id}
              className="flex w-250 items-center justify-between bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-md"
            >

              {/* left */}
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  className="w-12 h-12 object-contain"
                />

                <div>
                  <p className="font-bold">{item.title}</p>
                  <p className="text-sm text-white/60">{item.date}</p>
                </div>
              </div>

              {/* button */}
              <button className="bg-yellow-400 text-black text-sm font-bold px-4 py-2 rounded-full hover:bg-yellow-300">
                ดูดวงอีกครั้ง
              </button>

            </div>
          ))}

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
