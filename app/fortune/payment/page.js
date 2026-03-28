"use client";

const coins = [
    { label: "Coin x16", multiplier: "x16", price: "16 THB" },
    { label: "Coin x32", multiplier: "x32", price: "32 THB" },
    { label: "Coin x64", multiplier: "x64", price: "64 THB" },
];

export default function Payment() {
    return (
        <div>
            <div className="bg-[#070B2B] text-white rounded-xl w-full max-w-5xl p-10 shadow-xl mx-auto mt-30">

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

                {/* Cards */}
                <div className="grid grid-cols-3 gap-6">
                    {coins.map(({ label, multiplier, price }) => (
                        <button
                            key={label}
                            className="flex flex-col items-center gap-3 group cursor-pointer"
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
                    ))}
                </div>
            </div>
        </div>
    );
}