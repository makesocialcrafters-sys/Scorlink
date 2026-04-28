const BigStat = () => {
  return (
    <section className="relative overflow-hidden border-b border-bordeaux bg-bordeaux px-6 py-[160px] text-cream md:px-10">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cream/[0.12]"
        style={{ width: 740, height: 740 }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cream/[0.08]"
        style={{ width: 380, height: 380 }}
      />

      <div className="relative z-[2] mx-auto max-w-[1100px] text-center">
        <div className="font-mono-meta mb-9 flex items-center justify-center gap-[14px] text-[11px] font-medium uppercase tracking-[0.32em] text-cream opacity-65">
          <span className="h-px w-9 bg-cream/50" />
          Die Realität · Weltweit
          <span className="h-px w-9 bg-cream/50" />
        </div>

        <div
          className="font-display-italic mb-7 text-cream"
          style={{
            fontSize: "clamp(140px, 22vw, 320px)",
            lineHeight: 0.9,
            letterSpacing: "-0.05em",
            fontWeight: 200,
            fontVariationSettings: '"opsz" 144, "SOFT" 50',
          }}
        >
          &lt;1%
        </div>

        <h2 className="font-display mx-auto mb-7 max-w-[800px] text-[clamp(26px,3.4vw,42px)] font-normal leading-[1.18] tracking-[-0.025em] text-cream">
          270 Millionen Menschen spielen Fußball. Nur 130.000 davon sind Profis. Der Rest wird nie gesehen.
        </h2>

        <div className="font-mono-meta text-[11px] font-medium uppercase tracking-[0.22em] text-cream opacity-45">
          Quelle · FIFA Professional Football Report · 2023
        </div>
      </div>
    </section>
  );
};

export default BigStat;
