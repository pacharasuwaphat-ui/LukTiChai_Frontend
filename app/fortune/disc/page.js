"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DicePage() {
  const [rolling, setRolling] = useState(false);
  const [isRolled, setIsRolled] = useState(false);
  const [message, setMessage] = useState("");

  const [result, setResult] = useState({
    zodiac: 0,
    planet: 0,
    house: 0,
  });

  const router = useRouter();

  // random 1-12
  const random12 = () => Math.floor(Math.random() * 12) + 1;

  const rollDice = () => {
    if (rolling) return;

    setRolling(true);
    setIsRolled(false); // reset

    let count = 0;

    const interval = setInterval(() => {
      setResult({
        zodiac: random12(),
        planet: random12(),
        house: random12(),
      });

      count++;

      if (count > 10) {
        clearInterval(interval);

        const finalResult = {
          zodiac: random12(),
          planet: random12(),
          house: random12(),
        };

        setResult(finalResult);
        setRolling(false);
        setIsRolled(true); // 👈 ทอยเสร็จแล้ว
      }
    }, 80);
  };

  const handleViewPrediction = async () => {
    console.log("ดูคำทำนาย", result);
    try {
      const userStr = localStorage.getItem("user");
      const user = JSON.parse(userStr);

      // ยิง request ไป backend NestJS
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fortune/dice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      
        // ส่งข้อมูลไป backend
        body: JSON.stringify({
          Zodiac : result.zodiac,
          Planet : result.planet,
          House : result.house,
          userId : user.id
        }),
      });

      // แปลง response จาก backend เป็น json
      const data = await res.json();
      // ถ้า backend ส่ง error กลับมา
      if (!res.ok) {
        setMessage(data.message || "get fortune card failed");
        return;
      }

      // ไปหน้า result พร้อมส่งข้อมูลไปด้วย (อาจใช้ query หรือ state)
      router.push(`/fortune/disc/result/${[result.zodiac, result.planet, result.house].join("-")}/
${[data.zodiac_name, data.planet_name, data.house_name].join("-")}/${data.readings}/
${data.advice}`);

    } catch (error) {
      setMessage("Website is currently unavailable. Please try again later.");
    }

    // TODO:
    // - call API 1728
    // - หรือ router ไปหน้า result
  }; 

  return (
    <div >

      {/* container */}
      <div className="w-full max-w-5xl bg-[#0b0f2a] rounded-2xl p-10 shadow-xl mx-auto mt-30">

        {/* header */}
        <div className="flex gap-6 items-start">
          <img
            src="/disc.png"
            className="w-50 h-28 object-cover rounded-lg"
          />

          <div>
            <h1 className="text-3xl font-bold mb-2">ลูกเต๋าพยากรณ์</h1>
            <p className="text-sm text-white/80 leading-relaxed max-w-xl">
              ลูกเต๋าพยากรณ์เป็นศาสตร์การพยากรณ์จากโลกตะวันตก จัดอยู่ในแขนงของ Cleromancy
              หรือการเสี่ยงทายด้วยวัตถุ เช่นเดียวกับการจับฉลากและสิ่งอื่นๆ
              ศาสตร์นี้ผสมหลักโหราศาสตร์ตะวันตกเข้ากับการสุ่มเชิงสัญลักษณ์ โดยใช้ลูกเต๋า 12 หน้า
              จำนวน 3 ลูก เพื่อสร้าง “แผนผังชะตาแบบย่อส่วน” ในทันที
            </p>
          </div>
        </div>

        {/* divider */}
        <div className="border-t border-white/20 my-10"></div>

        {/* description */}
        <div className="text-center text-sm text-white/80 leading-relaxed mb-10">
          <p>
            ทุกครั้งที่คุณเข้ามา ระบบจะจำลองการทอยลูกเต๋าทั้งสาม
          </p>
          <p>ออกมาเป็นผลลัพธ์ในรูปแบบ:</p>
          <p className="font-bold mt-1">ดาวเคราะห์ + ราศี + เรือน</p>
          <p className="mt-1">
            ซึ่งจะถูกนำมาตีความตามหลักโหราศาสตร์ตะวันตก เพื่อให้คำแนะนำหรือแนวโน้มที่เกี่ยวข้องกับคำถามของคุณ
          </p>
        </div>

        {/* 🎲 DICE */}
        <div className="flex justify-center items-center gap-12 mb-10">

          {/* Zodiac */}
          <div className="text-center">
            <img
              src={result.zodiac !== 0 ? `/dice/Zodiac_${result.zodiac}.png` : "/Zodiac_Sign.png"}
              className={`w-32 h-40 object-contain mb-2 transition-transform duration-200 ${
                rolling ? "animate-spin" : ""
              }`}
            />
            <p className="text-sm">Zodiac</p>
          </div>

          <div className="h-32 w-px bg-white/20"></div>

          {/* Planet */}
          <div className="text-center">
            <img
              src={result.planet !== 0 ? `/dice/Planets_${result.planet}.png` : "/Planets.png"}
              className={`w-32 h-40 object-contain mb-2 transition-transform duration-200 ${
                rolling ? "animate-spin" : ""
              }`}
            />
            <p className="text-sm">Planet</p>
          </div>

          <div className="h-32 w-px bg-white/20"></div>

          {/* House */}
          <div className="text-center">
            <img
              src={result.house !== 0 ? `/dice/House_${result.house}.png` : "/Houses.png"}
              className={`w-32 h-40 object-contain mb-2 transition-transform duration-200 ${
                rolling ? "animate-spin" : ""
              }`}
            />
            <p className="text-sm">House</p>
          </div>

        </div>

        {/* button */}
        <div className="flex justify-center mb-10">
          {!isRolled ? (
            <button
              onClick={rollDice}
              disabled={rolling}
              className={`px-8 py-3 rounded-full font-bold transition ${
                rolling
                  ? "bg-gray-400 text-black"
                  : "bg-yellow-400 text-black hover:bg-yellow-300"
              }`}
            >
              {rolling ? "กำลังทอย..." : "ทอยลูกเต๋า"}
            </button>
          ) : (
            <button
              onClick={handleViewPrediction}
              className="bg-purple-500 text-white font-bold px-8 py-3 rounded-full hover:bg-purple-400 transition"
            >
              ดูคำทำนาย 🔮
            </button>
          )}
        </div>

        {/* warning */}
        <div className="mb-6">
          <p className="text-red-500 font-bold mb-2">คำเตือน</p>
          <p className="text-sm text-white/80">
            คำพยากรณ์เป็นการสะท้อนพลังงาน ณ ขณะนั้น <br />
            ไม่ใช่การกำหนดอนาคตอย่างตายตัว การตัดสินใจยังคงอยู่ในมือของคุณเสมอ
          </p>
        </div>

        {/* guide */}
        <div>
          <p className="text-red-500 font-bold mb-2">คำแนะนำในการใช้ลูกเต๋าพยากรณ์</p>
          <ol className="text-sm text-white/80 list-decimal ml-5 space-y-1">
            <li>ตั้งคำถามในใจให้ชัดเจนก่อนกดทอย</li>
            <li>ไม่ควรถามคำถามเดิมซ้ำหลายครั้งในวันเดียวกัน</li>
            <li>พิจารณาความหมายของ “ดาว + ราศี + เรือน” ร่วมกัน</li>
            <li>ใช้ผลลัพธ์เป็นแนวทาง ไม่ใช่ข้อบังคับ</li>
            <li>การตัดสินใจสุดท้ายขึ้นอยู่กับคุณเสมอ</li>
          </ol>
        </div>

      </div>

    </div>
  );
}