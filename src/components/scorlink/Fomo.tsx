const Fomo = () => {
  return (
    <section className="relative overflow-hidden border-b border-bordeaux bg-cream px-6 py-[180px] text-center text-bordeaux md:px-10">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-bordeaux/[0.08]" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-bordeaux/[0.12]"
        style={{ width: 520, height: 520 }}
      />

      <div className="relative z-[2] mx-auto max-w-[920px]">
        <div className="font-mono-meta mb-9 flex items-center justify-center gap-[14px] text-[11px] font-medium uppercase tracking-[0.32em] text-bordeaux opacity-65">
          <span className="h-px w-9 bg-bordeaux/50" />
          Die ehrliche Wahrheit
          <span className="h-px w-9 bg-bordeaux/50" />
        </div>

        <h2
          className="font-display mb-10 text-bordeaux"
          style={{
            fontSize: "clamp(60px, 9vw, 130px)",
            lineHeight: 1,
            letterSpacing: "-0.045em",
            fontWeight: 300,
          }}
        >
          Während du wartest,<br />
          wird ein anderer<br />
          <span className="font-display-italic" style={{ fontWeight: 400 }}>gesehen.</span>
        </h2>

        <p className="font-display-italic mx-auto mb-12 max-w-[640px] text-[clamp(19px,1.7vw,23px)] font-normal leading-[1.45] tracking-[-0.01em] text-bordeaux opacity-[0.78]">
          Talent allein reicht nicht mehr. Wer heute nicht digital sichtbar ist, existiert für Scouts nicht. Der Wettbewerb läuft — mit oder ohne dich.
        </p>

        <a
          href="#signup"
          className="inline-flex items-center gap-[14px] border border-bordeaux bg-bordeaux px-9 py-[19px] font-body text-[14px] font-medium tracking-[0.04em] text-cream no-underline transition-all duration-300 hover:-translate-y-0.5 hover:bg-cream hover:text-bordeaux"
        >
          Jetzt anmelden
          <span className="font-display text-[18px] font-light">→</span>
        </a>
      </div>
    </section>
  );
};

export default Fomo;
