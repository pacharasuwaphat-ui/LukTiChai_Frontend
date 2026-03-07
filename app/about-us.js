"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {

  return (
    <div className="bg-[#070b1a] font-mono text-white scroll-smooth">

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

      {/* block 1 */}
      <section className="w-full bg-gradient-to-r from-purple-700 to-purple-500">
        <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-10 items-center">

          {/* Left */}
          <div>
            <p className="text-sm text-purple-200 mb-3">
              แพลตฟอร์ม Luck Ti Chai
            </p>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Platform ถูกกฎหมาย <br />
              รวดเร็วและปลอดภัย
            </h1>
          </div>

          {/* Right */}
          <div className="flex justify-center">
            
            <Image
              src="/laptop.png"
              alt="platform preview"
              width={500}
              height={300}
              className="drop-shadow-2xl"
            />
            
          </div>

        </div>
      </section>

      {/* block 2 */}
      <section className="bg-[#070b1a] py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-3xl font-bold mb-6">
            Luck Ti Chai คืออะไร?
          </h2>

          <p className="text-gray-400 max-w-3xl mx-auto mb-14">
            Luck Ti Chai คือ แพลตฟอร์มลงทุนดิจิทัลที่ออกแบบมาเพื่อความปลอดภัย
            ใช้งานง่าย และให้ผลตอบแทนที่รวดเร็ว รองรับการใช้งานทั้งมือถือและคอมพิวเตอร์
          </p>

          <div className="grid md:grid-cols-3 gap-10">

            <div>
              <h3 className="font-semibold mb-2">การตรวจ</h3>
              <p className="text-gray-400 text-sm">
                ตรวจสอบระบบทั้งหมด
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">การฝากเงิน</h3>
              <p className="text-gray-400 text-sm">
                สะดวกรวดเร็ว
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">คำนวณ</h3>
              <p className="text-gray-400 text-sm">
                ระบบคำนวณอัตโนมัติ
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* block 3 */}
      <section className="bg-gradient-to-r from-purple-700 to-purple-500 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-3xl font-bold mb-14">
            ทำไมต้องเลือก Luck Ti Chai
          </h2>

          <div className="grid md:grid-cols-2 gap-10 text-lg">

            <div>
              ใช้งานง่าย เข้าใจได้ง่าย
            </div>

            <div>
              การบริการที่ดีรวดเร็ว
            </div>

            <div>
              การทำธุรกรรมที่รวดเร็วปลอดภัย
            </div>

            <div>
              ราคาที่เป็นมิตร
            </div>

          </div>

        </div>
      </section>

      <footer className="w-full mt-20 pt-10 pb-6 text-sm text-white/80">
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
