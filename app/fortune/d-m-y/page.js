"use client";
import { useState, useRef } from "react";

export default function Home() {
    const dayRefs = [useRef(null), useRef(null)];
    const monthRefs = [useRef(null), useRef(null)];
    const yearRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

    const [dayVals, setDayVals] = useState(["", ""]);
    const [monthVals, setMonthVals] = useState(["", ""]);
    const [yearVals, setYearVals] = useState(["", "", "", ""]);

    const allRefs = [...dayRefs, ...monthRefs, ...yearRefs];

    const handleInput = (vals, setVals, refs, index, value, groupOffset) => {
        const digit = value.replace(/\D/g, "").slice(-1);
        const newVals = [...vals];
        newVals[index] = digit;
        setVals(newVals);
        if (digit && index < refs.length - 1) {
            refs[index + 1].current?.focus();
        } else if (digit && index === refs.length - 1) {
            const nextGroupStart = groupOffset + refs.length;
            allRefs[nextGroupStart]?.current?.focus();
        }
    };

    const handleKeyDown = (vals, setVals, refs, index, e, groupOffset) => {
        if (e.key === "Backspace" && !vals[index] && index > 0) {
            refs[index - 1].current?.focus();
        } else if (e.key === "Backspace" && !vals[index] && index === 0 && groupOffset > 0) {
            allRefs[groupOffset - 1]?.current?.focus();
        }
    };

    {/* เป็น style คล้ายๆ otp โดย input เสร็จช่องนึงจะไปต่อช่องถัดไปเลย */}
    const OTPBox = ({ val, inputRef, onChange, onKeyDown }) => (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <input
                ref={inputRef}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={val}
                onChange={onChange}
                onKeyDown={onKeyDown}
                style={{
                    width: "48px",
                    height: "64px",
                    background: "transparent",
                    border: "none",
                    borderBottom: "2px solid rgba(255,255,255,0.4)",
                    color: "white",
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    textAlign: "center",
                    outline: "none",
                    caretColor: "transparent",
                }}
                onFocus={e => (e.target.style.borderBottomColor = "#FBBF24")}
                onBlur={e => (e.target.style.borderBottomColor = "rgba(255,255,255,0.4)")}
            />
        </div>
    );

    return (
        <div>
            <div className="bg-[#070B2B] text-white rounded-xl w-full max-w-5xl p-10 shadow-xl mx-auto mt-30">

                {/* Header */}
                <div className="flex gap-6 items-start">
                    <div>
                        <h1 className="text-2xl font-bold mb-3">ดูดวงวัน / เดือน / ปีเกิด</h1>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            ศาสตร์การพยากรณ์จากวัน เดือน และปีเกิด เป็นการวิเคราะห์พื้นดวงตามหลักโหราศาสตร์ โดยใช้ข้อมูลวันเกิดเป็นตัวแทน
                            ของพลังงานประจำตัว (Birth Energy) วันเกิดสะท้อนให้เห็นบุคลิกและนิสัยพื้นฐาน เดือนเกิดสะท้อนให้เห็นแนวโน้มด้าน
                            อารมณ์และรูปแบบการใช้ชีวิต ปีเกิดสะท้อนให้เห็นจังหวะชีวิตและวัฏจักรของโชคชะตา เมื่อวิเคราะห์ร่วมกัน จะช่วยให้เห็น
                            ภาพรวมของตัวตน จุดแข็ง จุดที่ควรระวัง รวมถึงแนวโน้มด้านการงาน การเงิน ความรัก และสุขภาพ
                        </p>
                    </div>
                </div>

                <hr className="my-8 border-gray-600" />

                {/* Bullet */}
                <ul className="text-gray-300 text-sm space-y-2 mb-10">
                    <p>ทุกครั้งที่คุณกรอกวัน / เดือน / ปีเกิด ระบบจะทำการวิเคราะห์จาก :</p>
                    <li>• ธาตุประจำวันเกิด</li>
                    <li>• เลขผลรวมวัน เดือน ปีเกิด</li>
                    <li>• วงจรอายุและจังหวะชีวิตในช่วงเวลาปัจจุบัน</li>
                    <p>จากนั้นจะแสดงคำพยากรณ์และคำแนะนำเฉพาะบุคคล</p>
                </ul>

                {/* Date Inputs */}
                <div className="flex justify-center items-end space-x-4 mb-10">

                    {/* วัน */}
                    <div className="flex flex-col items-center flex-1 gap-4">
                        <label className="text-white text-5xl font-bold">วัน</label>
                        <div className="flex gap-3">
                            {dayVals.map((val, i) => (
                                <OTPBox
                                    key={i}
                                    val={val}
                                    inputRef={dayRefs[i]}
                                    onChange={e => handleInput(dayVals, setDayVals, dayRefs, i, e.target.value, 0)}
                                    onKeyDown={e => handleKeyDown(dayVals, setDayVals, dayRefs, i, e, 0)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="text-gray-500 text-8xl font-thin pb-2 leading-none -rotate-6 select-none">/</div>

                    {/* เดือน */}
                    <div className="flex flex-col items-center flex-1 gap-4">
                        <label className="text-white text-5xl font-bold">เดือน</label>
                        <div className="flex gap-3">
                            {monthVals.map((val, i) => (
                                <OTPBox
                                    key={i}
                                    val={val}
                                    inputRef={monthRefs[i]}
                                    onChange={e => handleInput(monthVals, setMonthVals, monthRefs, i, e.target.value, 2)}
                                    onKeyDown={e => handleKeyDown(monthVals, setMonthVals, monthRefs, i, e, 2)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="text-gray-500 text-8xl font-thin pb-2 leading-none -rotate-6 select-none">/</div>

                    {/* ปี */}
                    <div className="flex flex-col items-center flex-1 gap-4">
                        <label className="text-white text-5xl font-bold">ปี</label>
                        <div className="flex gap-3">
                            {yearVals.map((val, i) => (
                                <OTPBox
                                    key={i}
                                    val={val}
                                    inputRef={yearRefs[i]}
                                    onChange={e => handleInput(yearVals, setYearVals, yearRefs, i, e.target.value, 4)}
                                    onKeyDown={e => handleKeyDown(yearVals, setYearVals, yearRefs, i, e, 4)}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Button */}
                <div className="flex justify-center mb-10">
                    <button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold px-6 py-2 rounded-full shadow-lg hover:scale-105 transition">
                        ตรวจดวงชะตา
                    </button>
                </div>

                {/* Warning */}
                <div className="text-sm text-gray-300 leading-relaxed space-y-3">
                    <p className="text-red-500 font-semibold">คำเตือน</p>
                    <p>การดูดวงเป็นการวิเคราะห์แนวโน้มตามหลักโหราศาสตร์ ไม่ใช่การกำหนดอนาคตอย่างตายตัว ผลลัพธ์เป็นเพียงแนวทางประกอบการตัดสินใจเท่านั้น</p>
                    <p className="text-red-500 font-bold mb-2">คำแนะนำในการใช้งานระบบดูดวง</p>
                    <ol className="list-decimal ml-5 space-y-1">
                        <li>กรอกวัน เดือน ปีเกิดให้ถูกต้องครบถ้วน</li>
                        <li>ควรใช้ข้อมูลวันเกิดตามปฏิทินสากล (ค.ศ.)</li>
                        <li>อ่านคำพยากรณ์โดยพิจารณาภาพรวม ไม่ยึดติดเพียงบางประโยค</li>
                        <li>ใช้คำแนะนำเป็นแนวทางในการวางแผนชีวิต</li>
                        <li>การตัดสินใจสุดท้ายยังคงขึ้นอยู่กับตัวคุณเองเสมอ</li>
                    </ol>
                </div>

            </div>
        </div>
    );
}