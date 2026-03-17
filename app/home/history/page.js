
export default function Home() {

  {/* ลบตรงนี้ออกด้วย ตัวอย่างนี้แค่ทดสอบเท่านั้น ท่านดึงจาก api มายังไงก็แล้วแต่ท่านเลย */}
  const history = [
    {
      id: 1,
      title: "ดูดวงแบบ : เปิดไพ่",
      date: "2024/08/13 13:02",
      image: "/tarot.png"
    },
    {
      id: 2,
      title: "ดูดวงแบบ : ลูกเต๋าพยากรณ์",
      date: "2024/08/13 12:08",
      image: "/dice.png"
    },
    {
      id: 3,
      title: "ดูดวงแบบ : สุ่มเซียมซี",
      date: "2024/08/12 07:29",
      image: "/sticks.png"
    }
  ];

  return (
    <div>

      <section className="mt-10">
        <h1 className="text-5xl font-bold text-left">History</h1>
        <div className="flex flex-col gap-6 mt-6">

          {history.map((item) => (
            <div
              key={item.id}
              className="flex w-250 items-center justify-between bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-md"
            >

              {/* left */}
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  className="w-12 h-12 object-contain"
                />

                <div>
                  <p className="font-bold">{item.title}</p>
                  <p className="text-sm text-white/60">{item.date}</p>
                </div>
              </div>

              {/* button */}
              <button className="bg-yellow-400 text-black text-sm font-bold px-4 py-2 rounded-full hover:bg-yellow-300">
                ดูดวงอีกครั้ง
              </button>

            </div>
          ))}

        </div>
      </section>


    </div>
  );
}
