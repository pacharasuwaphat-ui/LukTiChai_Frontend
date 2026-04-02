"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const [getad , setGetAd] = useState(false);

    const dayRefs = [useRef(null), useRef(null)];
    const monthRefs = [useRef(null), useRef(null)];
    const yearRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const [result, setResult] = useState(null);

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

    //getdata from localStorage
    useEffect(() => {
    const fetchData = async () => {
        const data = localStorage.getItem("fortuneResult");
        if (!data) return;

        const parsed = JSON.parse(data);
        setResult(parsed);

        // set date
        if (parsed.dob) {
        const [year, month, day] = parsed.dob.split("-");
        setDayVals(day.split(""));
        setMonthVals(month.split(""));
        setYearVals(year.split(""));
        }

        console.log("historyId:", parsed.historyId);

        const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/fortune/findFortune/${parsed.historyId}`
        );

        if (!res.ok) {
        throw new Error("Failed to fetch advice");
        }

        const fortuneData = await res.json();
        setGetAd(fortuneData.getAdvice);
    };

    fetchData();
    }, []);

    const getAdvice = async () => {
        const userstr = localStorage.getItem("user");
        const user = JSON.parse(userstr);
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
        <div>
            <div className="bg-[#070B2B] text-white rounded-xl w-full max-w-5xl p-10 shadow-xl mx-auto mt-20 py-20 px-20">

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

                {/* Date Output (เอาเลขจากตอน input มาใส่) */}
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

                {/* result */}
                <div className="space-y-6 text-gray-300">

                    {/* Title Card */}
                    <div className="bg-[#0F1021] border border-yellow-500/20 rounded-xl p-6 shadow-lg">
                        <h2 className="text-2xl font-bold text-yellow-400 mb-2">
                            {result?.prediction?.title}
                        </h2>
                        <p className="text-sm leading-relaxed">
                            {result?.prediction?.core_personality}
                        </p>
                    </div>

                    {/* Strength + Weakness */}
                    <div className="grid md:grid-cols-2 gap-6">

                        {/* Strength */}
                        <div className="bg-[#0F1021] rounded-xl p-5 border border-green-500/20">
                            <p className="text-green-400 font-bold mb-3">✨ จุดแข็ง</p>
                            <ul className="space-y-1 text-sm leading-relaxed">
                                {result?.prediction?.strengths
                                    ?.split(",")
                                    .map((item, i) => (
                                        <li key={i}>• {item.trim()}</li>
                                    ))}
                            </ul>
                        </div>

                        {/* Weakness */}
                        <div className="bg-[#0F1021] rounded-xl p-5 border border-red-500/20">
                            <p className="text-red-400 font-bold mb-3">⚠️ จุดอ่อน</p>
                            <p className="text-sm leading-relaxed">
                                {result?.prediction?.weaknesses}
                            </p>
                        </div>
                    </div>

                    {/* Career */}
                    <div className="bg-[#0F1021] rounded-xl p-5 border border-blue-500/20">
                        <p className="text-blue-400 font-bold mb-3">💼 อาชีพที่เหมาะสม</p>
                        <p className="text-sm leading-relaxed">
                            {result?.prediction?.suitable_careers}
                        </p>
                    </div>

                    {/* Love */}
                    <div className="bg-[#0F1021] rounded-xl p-5 border border-pink-500/20">
                        <p className="text-pink-400 font-bold mb-3">❤️ ความรัก</p>
                        <p className="text-sm leading-relaxed">
                            {result?.prediction?.love_relationships}
                        </p>
                    </div>

                    {/* Lucky Colors */}
                    <div className="bg-[#0F1021] rounded-xl p-5 border border-yellow-500/20">
                        <p className="text-yellow-400 font-bold mb-3">🎨 สีมงคล</p>
                        <div className="flex flex-wrap gap-2">
                            {result?.lucky_colors?.map((color, i) => (
                                <span
                                    key={i}
                                    className="px-4 py-1 bg-yellow-400 text-black rounded-full text-xs font-semibold shadow"
                                >
                                    {color}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Advice */}
                    {getad && <div className="bg-gradient-to-r from-yellow-400/10 to-purple-500/10 border border-yellow-400/20 rounded-xl p-6 shadow-lg">
                        <p className="text-yellow-300 font-bold mb-3 text-lg">🔮 คำแนะนำ</p>
                        <p className="text-sm leading-relaxed">
                            {result?.prediction.advice}
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