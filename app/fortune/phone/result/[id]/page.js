"use client";

import { useState , useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PhonePage() {
  const [phone, setPhone] = useState("0625235775");
  const [result, setResult] = useState(null);
  const [getad , setGetAd] = useState(false);
  const router = useRouter();

  const getData = () =>{
    const resultstring = localStorage.getItem("fortuneResult");
    const result = JSON.parse(resultstring);
    if(result && result.phone){
        setPhone(result.phone);
        setResult(result);
    }
  }
    
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
    getData();
  }, []);

      const getAdvice = async () => {
        const userstr = localStorage.getItem("user");
        const user = JSON.parse(userstr);
        const resultstr = localStorage.getItem("fortuneResult");
        const result = JSON.parse(resultstr);
        if (user.coin < 5) { 
            router.push("/home/payment");  
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
    <div className="">

      {/* Container */}
      <div className="w-full max-w-5xl bg-[#070B2B] rounded-2xl mt-16 p-10 shadow-2xl py-20 px-20">

        {/* Title */}
        <h1 className="text-2xl font-bold mb-4">ทำนายเบอร์</h1>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed">
          ศาสตร์การทำนายเบอร์โทรศัพท์เป็นศาสตร์ด้านพลังตัวเลข (Numerology)
          ซึ่งเชื่อว่าตัวเลขแต่ละตัวมีพลังงานเฉพาะตัว และส่งผลต่อชีวิตของผู้ครอบครอง
          การวิเคราะห์จะพิจารณาจากการเรียงตัวของตัวเลขทั้งหมดในเบอร์
          เพื่อสะท้อนแนวโน้มด้านการเงิน การงาน ความรัก สุขภาพ และบุคลิกภาพ
          โดยวิเคราะห์ทั้ง “ผลรวมตัวเลข” และ “คู่ตัวเลขในเบอร์”
          เพื่อให้คำแนะนำที่เหมาะสมกับผู้ใช้งาน
        </p>

        {/* Divider */}
        <div className="border-t border-gray-600 my-6"></div>

        {/* Sub description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-10">
          กรอกเบอร์โทรศัพท์ ระบบจะทำการวิเคราะห์โดยพิจารณา:
          <br />• ผลรวมของตัวเลขทั้งหมด
          <br />• คู่ตัวเลขที่ติดกัน
          <br />• ความสมดุลของพลังเลขมงคลและเลขที่ควรระวัง
          <br />จากนั้นจะแสดงคำทำนายและคำแนะนำที่เกี่ยวข้องกับเบอร์ของคุณ
        </p>

        {/* Phone Display */}
        <div className="flex justify-center gap-4 text-6xl font-bold tracking-widest mb-6">
          {phone.split("").map((num, index) => (
            <div key={index} className="border-b-2 border-gray-500 px-2">
              {num}
            </div>
          ))}
        </div>

        {/* Warning */}
        <div className="mt-6">
          <p className="text-red-500 font-bold">คำเตือน</p>
          <p className="text-gray-400 text-sm">
            การทำนายเบอร์โทรศัพท์เป็นการวิเคราะห์เชิงสถิติและพลังตัวเลข
            ไม่ใช่การกำหนดอนาคตอย่างตายตัว
            ผลลัพธ์เป็นเพียงแนวทางประกอบการตัดสินใจ
          </p>
        </div>
        <p className="mt-6 text-gray-400 text-sm">
        <span className="text-red-500 font-bold">คะแนน:</span> {result?.score ?? "N/A"}
        </p>

        <p className="mt-6 text-gray-400 text-sm">
        <span className="text-red-500 font-bold">ความโชคดี:</span> {result?.title ?? "N/A"}
        </p>
        <div className="mt-6">
          <p className="text-red-500 font-bold">คำทำนาย</p>
          <p className="text-gray-400 text-sm">
            {result && result.readings ? result.readings : "N/A"}
          </p>
        </div>
        {getad && <div className="mt-6">
          <p className="text-red-500 font-bold">คำแนะนำ</p>
          <p className="text-gray-400 text-sm">
            {result && result.advice ? result.advice : "N/A"}
          </p>
        </div>}
        {/* Card */}
                        {!getad && <div className="relative rounded-3xl p-10 text-center bg-gradient-to-br from-purple-700 via-purple-600 to-black shadow-[0_0_60px_rgba(168,85,247,0.4)] mt-10">

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
  );
}