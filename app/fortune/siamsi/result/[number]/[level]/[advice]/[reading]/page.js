"use client";
import { motion } from "framer-motion";
import { use, useState , useEffect} from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SiamSiPage({params}) {

  const { number ,level, advice, reading } = use(params);

  const [getad , setGetAd] = useState(false);
  const router = useRouter();

    const [Level, setLevel] = useState("good");
    const [SiamsiNumber, setSiamsiNumber] = useState(null);
    const [Reading , SetReading] = useState("บลาๆๆๆๆ")
    const [Advice , setAdvice] = useState("บลาๆๆๆ")

  const Setdata = async () => {
    setSiamsiNumber(decodeURIComponent(number));
    setLevel(decodeURIComponent(level));
    setAdvice(decodeURIComponent(advice));
    SetReading(decodeURIComponent(reading));

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

        {/* Center */}
        <div className="flex justify-center">
            <div className="bg-gray-300 text-black w-[300px] h-[500px] rounded-md p-6 flex flex-col justify-between items-center">

                {/* 🔝 บน: เลข */}
                <div className="text-2xl font-bold">
                {SiamsiNumber ? `เลขเซียมซี: ${SiamsiNumber}` : "เขย่าเซียมซีเพื่อรับเลข"}
                </div>

                {/* 🔮 กลาง: คำทำนาย */}
                <div className="text-center text-sm leading-relaxed px-2">
                {Reading}
                </div>

                {/* 🔻 ล่าง: level */}
                <div className={`text-xl font-semibold 
                ${level === "good" && "text-green-600"}
                ${level === "medium" && "text-yellow-600"}
                ${level === "warning" && "text-orange-600"}
                ${level === "bad" && "text-red-600"}
                `}>
                ระดับ: {level}
                </div>
            </div>
        </div>  
        

        {/* Warning */}
        <div className="mt-10 mx-20">
          <p className="text-red-500 font-bold">คำเตือน</p>
          <p className="text-gray-300 text-sm">
            แนะนำให้เสี่ยงเซียมซีสัปดาห์ละ 1 ครั้งเท่านั้น
          </p>
        </div>

        {/* Advice */}
        {getad && <div className="mt-6 mb-30 mx-20">
          <p className="text-red-500 font-bold">คำแนะนำสำเพิ่มเติม</p>
          <p className="text-gray-300 text-sm leading-relaxed">
            {Advice}
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