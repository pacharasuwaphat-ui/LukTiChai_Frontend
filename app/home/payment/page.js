"use client";

import { useState , useEffect } from "react";

const coins = [
    { label: "Coin x20", multiplier: "x20", price: "20 THB" },
    { label: "Coin x40", multiplier: "x40", price: "40 THB" },
    { label: "Coin x80", multiplier: "x80", price: "80 THB" },
];

export default function Payment() {

    const [qr, setQr] = useState(null);

    const handlePayment = async (amount) => {
        console.log("AMOUNT:", amount);
        const userString = localStorage.getItem("user");
        if (!userString) return alert("login first");

        const user = JSON.parse(userString);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/promptpay`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            userId: user.id,
            amount,
            }),
        });

        const data = await res.json();
        setQr(data.qr);

        const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/webhook`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            key: "charge.complete",
            data: {
                id: "test_charge_123",
                status: "successful",
                amount: amount*100,
                metadata: {
                userId: user.id
                }
            }
            }),
        });
        const data2 = await res2.json();
        user.coin = data2.coin;
        localStorage.setItem("user", JSON.stringify(user));
    };

    return (
        <div>
            <div className="bg-[#070B2B] text-white rounded-xl w-500 max-w-5xl p-10 shadow-xl mx-auto mt-30 py-20">

                {/* Title */}
                <div className="flex justify-center mb-8">
                    <h2
                        className="text-3xl font-bold px-10 py-2"
                        style={{
                            background: "linear-gradient(180deg, #7c2fa8 0%, #5b1f8a 100%)",
                            border: "2px solid #c084fc",
                            borderRadius: "999px",
                            color: "#ffffff",
                            boxShadow: "0 0 12px #a855f766, inset 0 1px 0 #d8b4fe44",
                            letterSpacing: "0.08em",
                        }}
                    >
                        Coin
                    </h2>
                </div>

                
                {qr && (
                <div className="mt-10 flex flex-col items-center">
                    <p className="mb-2">Scan เพื่อจ่ายเงิน</p>
                    <img src={qr} className="w-60" />
                </div>
                )}

                {/* Cards */}
                {qr == null && <div className="grid grid-cols-3 gap-6">
                    {coins.map(({ label, multiplier, price }) => {
                    const amount = Number(multiplier.replace("x", "").trim());
                    return(
                        <button
                            key={label}
                            className="flex flex-col items-center gap-3 group cursor-pointer"
                            onClick={() => handlePayment(amount)}
                            style={{ background: "none", border: "none", padding: 0 }}
                        >
                            {/* Top label */}
                            <div className="px-5 py-1 text-sm font-semibold">
                                [ {label} ]
                            </div>

                            {/* Coin image area */}
                            <div className="relative w-full aspect-square flex items-center justify-center">
                                {/* Glow bg */}
                                <div
                                    className="absolute inset-0 rounded-xl"
                                    style={{
                                        background: "radial-gradient(ellipse at center, #6d28d955 0%, transparent 70%)",
                                    }}
                                />

                                {/* Coin image */}
                                <img
                                    src="/lucky-coin.png"
                                    alt="lucky coin"
                                    className="w-4/5 aspect-square object-contain drop-shadow-lg"
                                />

                                {/* Multiplier badge */}
                                <div
                                    className="absolute bottom-1 right-1 font-black"
                                    style={{
                                        fontSize: "1.4rem",
                                        color: "#fbbf24",
                                        textShadow: "0 0 8px #f59e0b, -1px -1px 0 #78350f, 1px -1px 0 #78350f, -1px 1px 0 #78350f, 1px 1px 0 #78350f",
                                        letterSpacing: "-0.02em",
                                    }}
                                >
                                    {multiplier}
                                </div>
                            </div>
                            
                            {/* Price button */}
                            <div
                                className="px-6 py-1 text-sm font-semibold group-hover:scale-105 transition-transform"
                                style={{
                                    background: "linear-gradient(180deg, #7c2fa8 0%, #5b1f8a 100%)",
                                    border: "2px solid #c084fc",
                                    borderRadius: "999px",
                                    color: "#ffffff",
                                    boxShadow: "0 0 12px #a855f766, inset 0 1px 0 #d8b4fe44",
                                    letterSpacing: "0.08em",
                                }}
                            >
                                [ {price} ]
                            </div>
                        </button>
                    )})}
                </div>}
            </div>
        </div>
    );
}