"use client";
import { motion } from "framer-motion";
import { use, useState , useEffect} from "react";
import Image from "next/image";

export default function SiamSiPage({params}) {

  const { number ,level, advice, reading } = use(params);

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
    Setdata();
  }, []);


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
        <div className="mt-6 mb-30 mx-20">
          <p className="text-red-500 font-bold">คำแนะนำสำเพิ่มเติม</p>
          <p className="text-gray-300 text-sm leading-relaxed">
            {Advice}
          </p>
        </div>

      </div>
    </div>
  );
}