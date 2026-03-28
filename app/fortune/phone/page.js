"use client";
import { useState , useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NumberPage() {

  const [User , setUser] = useState(null);
  const [phoneDigits, setPhoneDigits] = useState(Array(10).fill(""));

  const getData = () =>{
    const userString = localStorage.getItem("user");

    if (userString) {
      const parsed = JSON.parse(userString);
      setUser(parsed);

      // 👉 ดึง phone
      if (parsed.phone) {
        const digits = parsed.phone.toString().split("").slice(0, 10);

        // เติมให้ครบ 10 ช่อง
        const filled = [...digits, ...Array(10 - digits.length).fill("")];

        setPhoneDigits(filled);
      }
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="mt-20">

      {/* Container */}
      <div className="w-full max-w-5xl bg-[#070B2B] rounded-xl p-10 mt-20 shadow-xl px-30 py-20">

        {/* Title */}
        <h1 className="text-2xl font-bold mb-4">ทำนายเบอร์</h1>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed mb-6">
          ศาสตร์การทำนายเบอร์โทรศัพท์เป็นศาสตร์ด้านพลังตัวเลข (Numerology)
          ซึ่งเชื่อว่าตัวเลขแต่ละตัวมีพลังงานเฉพาะตัว และส่งผลต่อชีวิตของผู้ครอบครอง
          การวิเคราะห์จะพิจารณาจากการเรียงตัวของตัวเลขทั้งหมดในเบอร์
          เพื่อสะท้อนแนวโน้มด้านการงาน การเงิน ความรัก สุขภาพ และบุคลิกภาพ
          ศาสตร์นี้มีรากฐานจากศาสตร์ตะวันตกและเอเชีย
          โดยวิเคราะห์ทั้ง “ผลรวมตัวเลข” และ “คู่ตัวเลขที่ปรากฏในเบอร์”
          เพื่อให้คำแนะนำที่เหมาะสมกับผู้ใช้งาน
        </p>

        <hr className="border-gray-600 my-6" />

        {/* Bullet */}
        <ul className="text-gray-300 text-sm space-y-2 mb-10">
          <li>• ผลรวมของตัวเลขทั้งหมด</li>
          <li>• คู่ตัวเลขที่สำคัญ</li>
          <li>• ความสมดุลของพลังบวกและลบในแต่ละตำแหน่ง</li>
          <li>• แนวโน้มและคำแนะนำจากเบอร์ของคุณ</li>
        </ul>

        {/* Input */}
        <div className="flex justify-center gap-2 mb-10">
          {phoneDigits.map((digit, i) => (
            <input
              key={i}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => {
                const newDigits = [...phoneDigits];
                newDigits[i] = e.target.value;
                setPhoneDigits(newDigits);
              }}
              className="w-10 h-12 text-center bg-transparent border-b border-gray-500 focus:outline-none focus:border-yellow-400 text-lg"
            />
          ))}
        </div>

        {/* Button */}
        <div className="flex justify-center mb-10">
          <button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold px-6 py-2 rounded-full shadow-lg hover:scale-105 transition">
            วิเคราะห์เบอร์
          </button>
        </div>

        {/* Warning */}
        <div className="text-sm text-gray-300">
          <p className="text-red-500 font-bold mb-2">คำเตือน</p>
          <p className="mb-4">
            การทำนายเบอร์โทรศัพท์เป็นการวิเคราะห์เชิงสัญลักษณ์ของพลังตัวเลข
            ไม่ใช่การกำหนดอนาคตอย่างตายตัว ผลลัพธ์เป็นเพียงแนวทางประกอบการตัดสินใจ
          </p>

          <p className="text-red-500 font-bold mb-2">
            คำแนะนำในการใช้งานระบบทำนายเบอร์
          </p>

          <ol className="list-decimal ml-5 space-y-1">
            <li>กรอกหมายเลขโทรศัพท์ให้ครบถ้วนและถูกต้อง</li>
            <li>สามารถวิเคราะห์ได้มากกว่า 1 เบอร์ เพื่อเปรียบเทียบพลังงาน</li>
            <li>ควรพิจารณาทั้งภาพรวมและรายละเอียดตัวเลข</li>
            <li>ใช้คำแนะนำเป็นแนวทางในการปรับเปลี่ยนได้</li>
            <li>การตัดสินใจเปลี่ยนเบอร์ควรพิจารณาอย่างรอบคอบ</li>
          </ol>
        </div>
      </div>

      
    </div>
  );
}