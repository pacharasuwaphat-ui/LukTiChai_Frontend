"use client";

import { useState , use , useEffect } from "react";

export default function DiceResult({params}) {

  const { number, name, readings, advice } = use(params);

  const [message, setMessage] = useState("");
  const [Reading , setReading] = useState("");
  const [Advice , setAdvice] = useState("");
  const [result , setDiceResult] = useState({
    zodiac: { name: "สิงห์", img: "/dice/Zodiac_1.png" },
    planet: { name: "ศุกร์", img: "/dice/Planets_1.png" },
    house: { name: "เรือนที่ 7", img: "/dice/House_1.png" },
  });

  const Setdata = async () => {
    const numberArr = number.split("-");
    const nameArr = decodeURIComponent(name).split("-");

    setDiceResult({
      zodiac: { name: nameArr[0], img: `/dice/Zodiac_${numberArr[0]}.png` },
      planet: { name: nameArr[1], img: `/dice/Planets_${numberArr[1]}.png` },
      house: { name: nameArr[2], img: `/dice/House_${numberArr[2]}.png` },
    });  
    setReading(decodeURIComponent(readings));
    setAdvice(decodeURIComponent(advice));

  };
  
  useEffect(() => {
    Setdata();
  }, []);
  

  return (
    <div >

      {/* container */}
      <div className="w-full max-w-5xl bg-[#0b0f2a] rounded-2xl p-10 shadow-xl mt-30">

        {/* header */}
        <div className="flex gap-6 items-start">
          <div className="flex gap-2">
            <img src="/disc.png" className="w-50 h-28 object-cover rounded-lg"/>
          </div>

          <div>
            <h1 className="text-2xl font-bold mb-2">ลูกเต๋าพยากรณ์</h1>
            <p className="text-sm text-white/80 leading-relaxed max-w-xl">
              ลูกเต๋าพยากรณ์เป็นศาสตร์การพยากรณ์จากโลกตะวันตก
              จัดอยู่ในแขนงของ Cleromancy หรือการเสี่ยงทายด้วยวัตถุ
              เช่นเดียวกับการจับฉลาก และสิ่งอื่น ๆ
              โดยใช้ลูกเต๋า 12 หน้า จำนวน 3 ลูก เพื่อสร้าง
              “แผนผังชะตาแบบย่อส่วน” ในทันที
            </p>
          </div>
        </div>

        {/* divider */}
        <div className="border-t border-white/20 my-10"></div>

        {/* description */}
        <div className="text-center text-sm text-white/80 leading-relaxed mb-16">
          <p>ทุกครั้งที่คุณเข้ามา ระบบจะจำลองการทอยลูกเต๋าทั้งสาม</p>
          <p>ออกมาเป็นผลลัพธ์ในรูปแบบ:</p>
          <p className="font-bold mt-2">ดาวเคราะห์ + ราศี + เรือน</p>
          <p className="mt-2">
            ซึ่งจะถูกนำมาตีความตามหลักโหราศาสตร์ตะวันตก
            เพื่อให้คำแนะนำที่เกี่ยวข้องกับคำถามของคุณ
          </p>
        </div>

        {/* 🎲 DICE RESULT */}
        <div className="flex justify-center items-center gap-16 mb-16">

          {/* Zodiac */}
          <div className="text-center">
            <img
              src={result.zodiac.img}
              className="w-28 h-28 object-contain mb-2 hover:scale-110 transition"
            />
            <p className="text-sm text-white/80">{result.zodiac.name}</p>
          </div>

          {/* Planet */}
          <div className="text-center">
            <img
              src={result.planet.img}
              className="w-28 h-28 object-contain mb-2 hover:scale-110 transition"
            />
            <p className="text-sm text-white/80">{result.planet.name}</p>
          </div>

          {/* House */}
          <div className="text-center">
            <img
              src={result.house.img}
              className="w-28 h-28 object-contain mb-2 hover:scale-110 transition"
            />
            <p className="text-sm text-white/80">{result.house.name}</p>
          </div>

        </div>

        {/* 🔮 RESULT SECTION */}
        <div className="space-y-6">

          {/* คำเตือน */}
          <div>
            <p className="text-red-500 font-bold mb-2">คำเตือน</p>
            <p className="text-sm text-white/80 leading-relaxed">
              คำพยากรณ์เป็นการสะท้อนพลังงาน ณ ขณะนั้น
              ไม่ใช่การกำหนดอนาคตอย่างตายตัว การตัดสินใจยังคงอยู่ในมือของคุณเสมอ
            </p>
          </div>

          {/* คำทำนาย */}
          <div>
            <p className="text-red-500 font-bold mb-2">คำทำนาย</p>
            <p className="text-sm text-white/80 leading-relaxed">
              {Reading}
            </p>
          </div>

          {/* คำแนะนำ */}
          <div>
            <p className="text-red-500 font-bold mb-2">คำแนะนำ</p>
            <p className="text-sm text-white/80 leading-relaxed">
              {Advice}
            </p>
          </div>


        </div>

      </div>

    </div>
  );
}