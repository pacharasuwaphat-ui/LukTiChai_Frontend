"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SiamSiPage() {
  const [isShaking, setIsShaking] = useState(false);
  const [resultNumber, setResultNumber] = useState(null);
  const [message , setMessage] = useState("")

  const router = useRouter();

  const handleShake = () => {
    setIsShaking(true);

    setTimeout(() => {
      const random = Math.floor(Math.random() * 28) + 1;
      setResultNumber(random);
      setIsShaking(false);
    }, 800);
  };

  const handleViewResult = async () => {
    try {
        const userStr = localStorage.getItem("user");
      const user = JSON.parse(userStr);

      // ยิง request ไป backend NestJS
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fortune/siamsi`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // ส่งข้อมูลไป backend
        body: JSON.stringify({
          SiamsiNumber : resultNumber,
          userId : user.id
        }),
      });
      
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message || "get fortune siamsi failed");
        return;
      }

      // ไปหน้า result พร้อมส่งข้อมูลไปด้วย (อาจใช้ query หรือ state)
      router.push(`/fortune/siamsi/result/${resultNumber}/${data.level}/${data.advice}/${data.readings}`);

    } catch (error) {
        
    }
  }

  return (
    <div className="mt-10">
      <div className="w-full max-w-5xl bg-[#070B2B] rounded-xl p-10 mt-20 shadow-xl">

        {/* Header */}
        <div className="flex gap-6 items-center">
          <Image
            src="/siamsi.png"
            alt="เซียมซี"
            width={0}
            height={0}
            sizes="100vw"
            className="my-10 w-[250px] h-[auto]"
          />

          <div>
            <h1 className="text-2xl font-bold mb-2">เซียมซี</h1>
            <p className="text-gray-300 text-sm leading-relaxed">
              เซียมซี เชื่อว่ามีต้นกำเนิดมาจากประเทศจีน
              โดยเป็นการทำนายดวงชะตาจากการเขย่าไม้
            </p>
          </div>
        </div>

        <hr className="my-6 border-gray-600" />

        <p className="text-center text-gray-300 mb-8">
          ตั้งสมาธิ แล้วกด "เขย่าเซียมซี"
        </p>

        {/* Center */}
        <div className="flex flex-col items-center gap-6">

          {/* 👇 แสดงผล */}
          {!resultNumber ? (
            <motion.div
              animate={
                isShaking
                  ? {
                      x: [0, -10, 10, -10, 10, 0],
                      rotate: [0, -5, 5, -5, 5, 0],
                    }
                  : { x: 0, rotate: 0 }
              }
              transition={{ duration: 0.6 }}
            >
              <Image
                src="/stick.png"
                alt="เซียมซี"
                width={0}
                height={0}
                sizes="100vw"
                className="my-10 w-[200px] h-auto"
              />
            </motion.div>
          ) : (
            <div className="my-10 text-7xl font-bold text-yellow-400">
              {resultNumber}
            </div>
          )}

          {/* 👇 ปุ่ม */}
          {!resultNumber ? (
            <button
              onClick={handleShake}
              disabled={isShaking}
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold px-6 py-2 rounded-full hover:scale-105 transition disabled:opacity-50"
            >
              {isShaking ? "กำลังเขย่า..." : "กดเพื่อเขย่า"}
            </button>
          ) : (
            <button
              onClick={handleViewResult}
              className="bg-green-400 text-black font-bold px-6 py-2 rounded-full hover:scale-105 transition"
            >
              ดูผลลัพธ์
            </button>
          )}
        </div>

        {/* Warning */}
        <div className="mt-10 mx-20">
          <p className="text-red-500 font-bold">คำเตือน</p>
          <p className="text-gray-300 text-sm">
            แนะนำให้เสี่ยงเซียมซีสัปดาห์ละ 1 ครั้งเท่านั้น
          </p>
        </div>

        {/* Advice */}
        <div className="mt-6 mb-30 mx-20">
          <p className="text-red-500 font-bold">คำแนะนำสำหรับ ดูดวงเซียมซี</p>
          <p className="text-gray-300 text-sm leading-relaxed">
            การเสี่ยงเซียมซี เราต้องมีใจที่บริสุทธิ์ มีสมาธิเซียมซีจะบอกให้ทราบถึงเรื่องราวในอนาคตของคุณไม่ควรทำเล่นๆ หรือลบหลู่ และไม่ควรเซียมซีบ่อย
          </p>
        </div>

      </div>
    </div>
  );
}