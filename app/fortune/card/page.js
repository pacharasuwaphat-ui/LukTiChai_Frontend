export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-700 to-purple-900 flex items-center justify-center p-6">
      
      <div className="bg-[#070B2B] text-white rounded-xl w-full max-w-5xl p-10 shadow-xl">

        {/* Header */}
        <div className="flex gap-6 items-start">
          <img
            src="/SunCard.png"
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

        {/* Instruction */}
        <p className="text-gray-300 text-sm text-center mb-10">
          มาดูกันว่าดวงคุณวันนี้เป็นอย่างไร ตั้งสมาธิให้มั่น
          แล้วคลิกไพ่เพื่อเลือกไพ่ยิปซีขึ้นมา 1 ใบ จากนั้นกดปุ่ม
          "อ่านคำทำนาย"
        </p>

        {/* Cards */}
        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="w-16 h-24 bg-gray-300 rounded-md shadow-inner hover:scale-105 transition cursor-pointer"
            />
          ))}
        </div>

        <p className="text-center text-gray-400 mb-4">
          ยังไม่ได้เลือกไพ่
        </p>

        {/* Button */}
        <div className="flex justify-center mb-10">
          <button className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full shadow hover:bg-yellow-300 transition">
            อ่านคำทำนาย
          </button>
        </div>

        {/* Warning */}
        <div className="text-sm text-gray-300 leading-relaxed space-y-3">
          <p className="text-red-500 font-semibold">คำเตือน</p>
          <p>
            ไพ่ยิปซีมีอำนาจลึกลับ จึงไม่ควรดูบ่อยเกินวันละ 1 ครั้ง
            เป็นความเชื่อส่วนบุคคล โปรดใช้วิจารณญาณในการดูดวง
          </p>

          <p className="text-red-500 font-semibold mt-6">
            คำแนะนำสำหรับ ดูดวงไพ่ยิปซีรายวัน
          </p>

          <ul className="list-decimal pl-5 space-y-1">
            <li>
              การดูดวงด้วยไพ่ยิปซีควรใช้ "จิต" ของท่านในการทำนาย
              เพราะเชื่อว่าจิตมีพลังเหนือร่างกาย
            </li>
            <li>
              หากท่านไม่มีสมาธิ หรือกำลังเครียด ควรหลีกเลี่ยงการดูดวง
            </li>
            <li>
              คำทำนายเป็นเพียงแนวทาง ไม่ได้ถูกต้อง 100%
            </li>
          </ul>
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