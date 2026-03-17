"use client";
import { useState , useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [selectedCards, setSelectedCards] = useState([]);
  const [confirmed, setConfirmed] = useState(false);
  const [deck, setDeck] = useState([]);

  useEffect(() => {
    setDeck(shuffle(majorArcana));
  }, []);

  const majorArcana = [
    "THE_FOOL",
    "THE_MAGICIAN",
    "THE_HIGH_PRIESTESS",
    "THE_EMPRESS",
    "THE_EMPEROR",
    "THE_HIEROPHANT",
    "THE_LOVERS",
    "THE_CHARIOT",
    "STRENGTH",
    "THE_HERMIT",
    "WHEEL_OF_FORTUNE",
    "JUSTICE",
    "THE_HANGED_MAN",
    "DEATH",
    "TEMPERANCE",
    "THE_DEVIL",
    "THE_TOWER",
    "THE_STAR",
    "THE_MOON",
    "THE_SUN",
    "JUDGMENT",
    "THE_WORLD",
  ];

  const handleSelect = (index) => {

    if (confirmed) return;

    if (selectedCards.includes(index)) {
      setSelectedCards(selectedCards.filter((c) => c !== index));
      return;
    }

    if (selectedCards.length >= 3) return;

    setSelectedCards([...selectedCards, index]);
  };

  const confirmSelection = () => {
    if (selectedCards.length === 3) {
      setConfirmed(true);
    }
  };

  function shuffle(array) {
    const arr = [...array];

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
  }

  const goResult = () => {
    const chosen = selectedCards.map(i => deck[i]);
    router.push(`/fortune/card/result?cards=${chosen.join(",")}`);
  };

  return (
    <div >
      <div className="bg-[#070B2B] text-white rounded-xl w-full max-w-5xl p-10 shadow-xl mx-auto mt-30">

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
              ดูดวงของคุณวันนี้ด้วยไพ่ยิปซี หรือไพ่ทาโร่ต์ ศาสตร์การดูดวงที่มีมาแต่โบราณกาลของชาวยิปซี 
              โดยขอให้ศรัทธาในไพ่ ตั้งสมาธิให้มั่น อธิฐานในใจขอทราบเรื่องราวในวันนี้ เลือกไพ่ขึ้นมา 3 ใบ (Present / obstacle / Summary)
              แล้วไพ่ยิปซี หรือไพ่ทาโร่ต์จะเปิดเผยเรื่องราวในวันนี้ให้ท่านทราบ 
            </p>
          </div>
        </div>

        <hr className="my-8 border-gray-600" />

        {/* Instruction */}
        <p className="text-gray-300 text-sm text-center mb-10">
          คลิกเลือกไพ่ 3 ใบ ลำดับการเลือกมีผลต่อคำทำนาย
        </p>

        {/* Cards */}
        <div className="flex justify-center gap-3 mb-8 flex-wrap max-w-2xl mx-auto">

          {Array.from({ length: 22 }).map((_, i) => {

          const order = selectedCards.indexOf(i);
          const isSelected = order !== -1;

          return (
            <div
              key={i}
              className="relative w-16 h-24 perspective cursor-pointer"
              onClick={() => handleSelect(i)}
            >

              <div
                className={`
                  relative w-full h-full duration-700 transform-style-preserve-3d
                  ${confirmed && isSelected ? "rotate-y-180" : ""}
                `}
              >

                {/* Back card */}
                <img
                  src="/card/back-card.jpg"
                  className={`
                    absolute w-full h-full rounded shadow backface-hidden transition
                    ${isSelected && !confirmed ? "ring-4 ring-yellow-400 scale-105" : ""}
                  `}
                />

                {/* Front card */}
                <img
                  src={`/card/MajorCard/${deck[i]}.jpg`}
                  className="absolute w-full h-full rounded shadow backface-hidden rotate-y-180 transition"
                />

              </div>

              {/* Order number */}
              {isSelected && !confirmed && (
                <div className="absolute -top-2 -right-2 bg-yellow-400 text-black w-6 h-6 flex items-center justify-center rounded-full text-sm font-bold">
                  {order + 1}
                </div>
              )}

            </div>
          );
        })}

        </div>

        {/* Selected status */}
        <p className="text-center text-gray-300 mb-6">
          เลือกไพ่แล้ว {selectedCards.length} / 3 ใบ
        </p>

        {/* Selected order */}
        {selectedCards.length > 0 && (
          <div className="text-center text-sm text-gray-400 mb-6">
            ลำดับไพ่ที่เลือก:{" "}
            {selectedCards.map((c, i) => (
              <span key={i} className="mx-2">
                {i === 0 && "Present"}
                {i === 1 && "Advice"}
                {i === 2 && "Outcome"}
              </span>
            ))}
          </div>
        )}

        {/* Confirm Button */}
        {!confirmed && (
          <div className="flex justify-center mb-6">
            <button
              disabled={selectedCards.length !== 3}
              onClick={confirmSelection}
              className={`
                px-6 py-3 rounded-full font-semibold
                ${selectedCards.length === 3
                  ? "bg-yellow-400 text-black hover:bg-yellow-300"
                  : "bg-gray-500 text-gray-300 cursor-not-allowed"}
              `}
            >
              ยืนยันไพ่
            </button>
          </div>
        )}

        {/* Result Button */}
        {confirmed && (
          <div className="flex justify-center mb-10">
            <button
              onClick={goResult}
              className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full hover:bg-yellow-300"
            >
              อ่านคำทำนาย
            </button>
          </div>
        )}

        {/* Warning */}
        <div className="text-sm text-gray-300 leading-relaxed space-y-3">
          <p className="text-red-500 font-semibold">คำเตือน</p>
          <p>
            ไพ่ยิปซีมีอำนาจลึกลับ จึงไม่ควรดูบ่อยเกินวันละ 1 ครั้ง
            เป็นความเชื่อส่วนบุคคล โปรดใช้วิจารณญาณในการดูดวง
          </p>
        </div>

      </div>
    </div>
  );
}