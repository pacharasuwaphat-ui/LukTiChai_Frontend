
export default function Loading() {

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 60% 40%, #7c3aed 0%, #5b21b6 30%, #3b0764 60%, #1e003a 100%)",
      }}
    >
      {/* Bokeh dots */}
      {[
        { top: "8%", left: "6%", size: 80, opacity: 0.18 },
        { top: "15%", left: "82%", size: 55, opacity: 0.22 },
        { top: "5%", left: "55%", size: 30, opacity: 0.15 },
        { top: "70%", left: "4%", size: 60, opacity: 0.2 },
        { top: "75%", left: "88%", size: 75, opacity: 0.18 },
        { top: "85%", left: "60%", size: 35, opacity: 0.12 },
        { top: "50%", left: "92%", size: 25, opacity: 0.15 },
        { top: "40%", left: "2%", size: 20, opacity: 0.12 },
        { top: "30%", left: "70%", size: 18, opacity: 0.1 },
        { top: "60%", left: "30%", size: 22, opacity: 0.1 },
      ].map((dot, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            top: dot.top,
            left: dot.left,
            width: dot.size,
            height: dot.size,
            background: i % 3 === 0
              ? `rgba(212,170,80,${dot.opacity})`
              : `rgba(200,160,255,${dot.opacity})`,
            filter: "blur(18px)",
          }}
        />
      ))}

      {/* Sparkle dots */}
      {[
        { top: "22%", left: "18%" },
        { top: "38%", left: "78%" },
        { top: "62%", left: "14%" },
        { top: "72%", left: "70%" },
      ].map((s, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{ top: s.top, left: s.left }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path d="M8 0 L9 7 L16 8 L9 9 L8 16 L7 9 L0 8 L7 7 Z" fill="rgba(255,220,100,0.5)" />
          </svg>
        </div>
      ))}

      {/* Center content */}
      <div className="flex flex-col items-center gap-5 z-10">
        {/* Subtitle */}
        <div className="flex flex-col items-center gap-2">
            <p className="text-gray-200 text-sm tracking-widest" style={{ letterSpacing: "0.12em" }}>
                พลังแห่งจักรวาลนำทางคุณ
            </p>
            <hr className="w-72 border-0 border-t-2 border-white" />
        </div>
        
        {/* Title */}
        <h1
          className="font-bold"
          style={{
            fontSize: "3.2rem",
            background: "linear-gradient(180deg, #fde68a 0%, #f59e0b 50%, #d97706 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "0.02em",
            fontFamily: "Georgia, 'Times New Roman', serif",
            textShadow: "none",
          }}
        >
          Luck Ti Chai
        </h1>

        {/* Spinner */}
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "3px solid rgba(255,255,255,0.15)",
            borderTop: "3px solid #f59e0b",
            animation: "spin 1s linear infinite",
            marginTop: "0.5rem",
          }}
        />
      </div>

      {/* Footer */}
      <p
        className="absolute bottom-6 text-xs text-center"
        style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.05em" }}
      >
        © 2026 Luck Ti Chai | พลังแห่งจักรวาลนำทางคุณ
      </p>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}