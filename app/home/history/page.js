"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function history() {
  const router = useRouter();

  const [history, setHistory] = useState([]);
  const [hisData, setHisData] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const userString = localStorage.getItem("user");
        if (!userString) return;

        const user = JSON.parse(userString);
        const userId = user.id;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/fortune/history/${userId}`
        );
        if (!res.ok) {
          setMessage("Failed to fetch history");
          return;
        }

        const data = await res.json();
        setHisData(data);

        // map ให้ตรงกับ UI เดิม
        const formatted = data.map((item, index) => ({
          id: item._id,
          title: `ดูดวงแบบ : ${item.type}`,
          date: new Date(item.createdAt).toLocaleString(),
          image: "/card/SunCard.png"
        }));

        setHistory(formatted);

      } catch (error) {
        console.error(error);
      }
    };
  fetchHistory();
  }, []);

  const handleReplay = (id) => {

      const selected = hisData.find(item => item._id === id);
      const cards = selected.cards;
      const readings = selected.reading;
      router.push(`/fortune/card/result?cards=${cards.present},${cards.advice},${cards.outcome}?readings=${readings}`);
    };

  return (
    <div>

      <section className="mt-30">
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
                  className="w-20 h-20 object-contain"
                />

                <div>
                  <p className="font-bold">{item.title}</p>
                  <p className="text-sm text-white/60">{item.date}</p>
                </div>
              </div>

              {/* button */}
              <button
                onClick={() => handleReplay(item.id)}
                className="bg-yellow-400 text-black text-sm font-bold px-4 py-2 rounded-full hover:bg-yellow-300"
              >
                ดูดวงอีกครั้ง
              </button>

            </div>
          ))}

        </div>
      </section>

    </div>
  );
}