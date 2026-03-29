"use client";

import { useState , useEffect } from "react";

export default function PhonePage() {
  const [phone, setPhone] = useState("0625235775");
  const [result, setResult] = useState(null);

  const getData = () =>{
    const resultstring = localStorage.getItem("fortuneResult");
    const result = JSON.parse(resultstring);
    if(result && result.phone){
        setPhone(result.phone);
        setResult(result);
    }
  }
    
  useEffect(() => {
    getData();
  }, []);

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
        <div className="mt-6">
          <p className="text-red-500 font-bold">คำแนะนำ</p>
          <p className="text-gray-400 text-sm">
            {result && result.advice ? result.advice : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}