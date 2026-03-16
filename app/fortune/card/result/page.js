"use client";

import { useEffect , useState} from "react";
import { useSearchParams } from "next/navigation";

export default function ResultPage() {
  const [Result, setResult] = useState("");

  const searchParams = useSearchParams();
  const cards = searchParams.get("cards")?.split(",").map(c => c.trim()) || [];

  const Setdata = async () => {
    try {
        // ยิง request ไป backend NestJS
        const res = await fetch("http://localhost:4000/fortune/card", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          // ส่งข้อมูลไป backend
          body: JSON.stringify({
            Present : cards[0],
            Advice : cards[1],
            Outcome : cards[2],
          }),
        });

        // แปลง response จาก backend เป็น json
        const data = await res.json();

        // ถ้า backend ส่ง error กลับมา
        if (!res.ok) {
          setMessage(data.message || "get fortune card failed");
          return;
        }

        // แสดงผลลัพธ์ที่ได้จาก backend
        setResult(data.readings);

      } catch (error) {
        // กรณี server ปิด หรือเชื่อมต่อไม่ได้
        setMessage("Website is currently unavailable. Please try again later.");
      }
  };

  useEffect(() => {
    Setdata();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-700 to-purple-900 flex items-center justify-center p-6">

      <div className="bg-[#070B2B] text-white rounded-xl w-full max-w-5xl p-10 shadow-xl">

        {/* Header */}
        <div className="flex gap-6 items-start">
          <img
            src="/card/SunCard.png"
            alt="sun card"
            className="w-28 h-40 object-cover rounded"
          />

          <div>
            <h1 className="text-2xl font-bold mb-3">ดูดวงเปิดไพ่ยิปซี</h1>

            <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
              ดูดวงของคุณวันนี้ด้วยไพ่ยิปซี หรือไพ่ทาโรต์ ศาสตร์การดูดวงที่มีมาตั้งแต่โบราณกาล
              โดยให้ท่านเลือกไพ่เพียง 1 ใบ แล้วไพ่ยิปซีหรือไพ่ทาโรต์จะเปิดเผยเรื่องราวในวันนี้ให้กับคุณทราบ
            </p>
          </div>
        </div>

        <hr className="my-8 border-gray-600" />

        {/* Selected card */}
        <p className="text-gray-300 mb-6">ไพ่ที่คุณเลือกมาได้ ดังนี้</p>

        <div className="flex justify-center gap-8 mb-10">
          {cards.map((card, index) => (
            <div key={index} className="text-center">
              <img  src={`/card/MajorCard/${card}.jpg`} className="w-38 h-65 object-cover rounded shadow" />
              <p className="mt-2 text-sm text-gray-300">
                {index === 0 && "Present"}
                {index === 1 && "Advice"}
                {index === 2 && "Outcome"}
              </p>
            </div>
          ))}
        </div>

        {/* Warning */}
        <div className="space-y-4 text-sm leading-relaxed">

          <p className="text-red-500 font-semibold">คำเตือน</p>
          <p className="text-gray-300">
            ไพ่ยิปซีมีอำนาจลึกลับ จึงไม่ควรดูบ่อยเกินวันละ 1 ครั้ง
            เป็นความเชื่อส่วนบุคคล โปรดใช้วิจารณญาณในการดูดวง
          </p>

          <p>
            <span className="text-red-500 font-semibold">ไพ่ที่คุณจับได้</span>{" "}
            คือ <span className="font-semibold">{cards.map((card) => card).join(" , ")}</span>
          </p>

          <p>
            <span className="text-red-500 font-semibold">คำทำนาย</span>{" "}
            {Result}
          </p>

          <p>
            <span className="text-red-500 font-semibold">เสริมดวง</span>{" "}
            ให้ไปกราบไหว้สิ่งศักดิ์สิทธิ์ หรือพกเครื่องรางที่ช่วยเสริมพลังด้านจิตใจ
          </p>

          <p>
            <span className="text-red-500 font-semibold">วัตถุมงคล</span>{" "}
            (เป็นการแนะนำเพื่อเสริมดวง)
          </p>
        </div>



        {/* Footer */}
        <div className="mt-14 border-t border-gray-700 pt-8 grid grid-cols-3 gap-6 text-sm text-gray-300">

          <div>
            <h3 className="font-semibold mb-2">Contact us</h3>
            <p>Phone : 0x-xxx-xxxx</p>
            <p>Facebook : xxxx</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">บัญชี</h3>
            <p>แก้ไข</p>
            <p>ประวัติการทำนาย</p>
            <p>สิทธิประโยชน์</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">สำหรับธุรกิจ</h3>
            <p>คำแนะนำ</p>
            <p>แนะนำวัตถุมงคล</p>
          </div>

        </div>

        <p className="text-center text-gray-400 text-xs mt-8">
          © 2026 Luck Ti Chai | พ่อหมอดูดวงสำหรับคุณ
        </p>

      </div>
    </div>
  );
}