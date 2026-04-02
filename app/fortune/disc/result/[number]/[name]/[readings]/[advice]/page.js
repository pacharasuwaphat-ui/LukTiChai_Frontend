"use client";

import { useState , use , useEffect } from "react";
import { useRouter } from "next/navigation";
export default function DiceResult({params}) {

  const { number, name, readings, advice } = use(params);
  const [getad , setGetAd] = useState(false);
  const router = useRouter();
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
    const fetchData = async () => {
        const resultstr = localStorage.getItem("fortuneResult");
        const result = JSON.parse(resultstr);

        const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/fortune/findFortune/${result.historyId}`
        );

        if (!res.ok) {
        throw new Error("Failed to fetch advice");
        }

        const fortuneData = await res.json();
        setGetAd(fortuneData.getAdvice);
    };

    fetchData();
    Setdata();
  }, []);

      const getAdvice = async () => {
        const userstr = localStorage.getItem("user");
        const user = JSON.parse(userstr);
        const resultstr = localStorage.getItem("fortuneResult");
        const result = JSON.parse(resultstr);
        if (user.coin < 5) { 
            router.push("/home/payment"); 
            return; 
        }
        console.log("fetching advice with historyId:", result?.historyId);
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fortune/advice`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                // ส่งข้อมูลไป backend
                body: JSON.stringify({
                fortuneId: result?.historyId,
            }),
        });
        if (!res.ok) {
            throw new Error('Failed to fetch advice');
        }
        const data = await res.json();
        setGetAd(true);
        localStorage.setItem("user", JSON.stringify({
            ...user,
            coin: data.coin, // อัปเดตเหรียญใน localStorage
        }));
    }
  

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
          {getad && <div>
            <p className="text-red-500 font-bold mb-2">คำแนะนำ</p>
            <p className="text-sm text-white/80 leading-relaxed">
              {Advice}
            </p>
          </div>}
          {/* Card */}
                        {!getad && <div className="relative rounded-3xl p-10 text-center bg-gradient-to-br from-purple-700 via-purple-600 to-black shadow-[0_0_60px_rgba(168,85,247,0.4)]">

                            {/* Glow overlay */}
                            <div className="absolute inset-0 rounded-3xl bg-purple-500/10 blur-2xl"></div>

                            {/* Content */}
                            <div className="relative z-10 flex flex-col items-center gap-8">

                            {/* Title */}
                            <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 flex items-center gap-2">
                                🔒 ปลดล็อกเพื่อดูคำแนะนำเฉพาะคุณ
                            </h2>

                            {/* Button */}
                            <button className="px-10 py-4 rounded-full bg-yellow-400 text-black text-xl font-bold shadow-[0_0_30px_rgba(250,204,21,0.7)] hover:scale-105 hover:shadow-[0_0_50px_rgba(250,204,21,1)] transition-all duration-300"
                            onClick={getAdvice}
                            >
                                Use 5 Coin
                            </button>

                            </div>
                        </div>
                            }


        </div>

      </div>

    </div>
  );
}