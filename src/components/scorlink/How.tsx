const steps = [
  { num: "01", title: "Profil.", text: "Position, Verein, Alter, starker Fuß. In zwei Minuten fertig." },
  { num: "02", title: "Hochladen.", text: "Spielvideo rein. Die KI findet dich, analysiert dein Spiel, schreibt deinen Coach-Report." },
  { num: "03", title: "Sichtbar.", text: "Dein Profil landet im Discover. Vereine und Verbände finden dich dort." },
];

const How = () => {
  return (
    <section className="relative overflow-hidden border-b border-bordeaux bg-bordeaux px-6 py-[140px] text-cream md:px-10">
      {/* Vertical center divider */}
      <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-cream/[0.08]" />
      {/* Center circle */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cream/[0.12]"
        style={{ width: 320, height: 320 }}
      />

      <div className="relative z-[2] mx-auto max-w-[1200px]">
        <div className="font-mono-meta mb-7 flex items-center gap-[14px] text-[11px] font-medium uppercase tracking-[0.28em] text-cream opacity-70">
          <span className="h-px w-8 bg-cream/60" />
          So geht's · 01–03
        </div>

        <h2 className="font-display mb-16 max-w-[1000px] text-[clamp(48px,7vw,92px)] font-normal leading-none tracking-[-0.04em] text-cream">
          Drei Schritte.<br />
          <span className="font-display-italic">Das war's.</span>
        </h2>

        <div className="mt-20 grid grid-cols-1 border-t border-cream/40 md:grid-cols-3">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className={`relative border-b border-cream/40 py-14 ${
                i === 0 ? "md:pr-10" : i === steps.length - 1 ? "md:border-r-0 md:pl-10" : "md:px-10"
              } ${i < steps.length - 1 ? "md:border-r md:border-r-cream/[0.12]" : ""}`}
            >
              <div
                className="font-display-italic mb-8 text-cream opacity-65"
                style={{ fontSize: 76, lineHeight: 0.9, letterSpacing: "-0.05em", fontWeight: 300 }}
              >
                {s.num}
              </div>
              <h3 className="font-display mb-4 text-[34px] font-medium leading-[1.05] tracking-[-0.025em] text-cream">
                {s.title}
              </h3>
              <p className="font-display text-[17px] font-normal leading-[1.5] tracking-[-0.005em] text-cream opacity-80">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default How;
