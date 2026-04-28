const FinalCta = () => {
  return (
    <section id="signup" className="relative overflow-hidden bg-bordeaux px-6 py-[200px] text-center text-cream md:px-10">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cream/[0.12]"
        style={{ width: 700, height: 700 }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cream/[0.08]"
        style={{ width: 380, height: 380 }}
      />

      <div className="relative z-[2] mx-auto max-w-[800px]">
        <div className="font-mono-meta mb-9 text-[11px] font-medium uppercase tracking-[0.32em] text-cream opacity-60">
          Erste Analyse gratis · Keine Kreditkarte
        </div>

        <h2
          className="font-display mb-10 text-cream"
          style={{
            fontSize: "clamp(72px, 10vw, 140px)",
            lineHeight: 0.95,
            letterSpacing: "-0.045em",
            fontWeight: 300,
          }}
        >
          Werd<br />
          <span className="font-display-italic" style={{ fontWeight: 400 }}>Spieler.</span>
        </h2>

        <p className="font-display-italic mx-auto mb-[52px] max-w-[500px] text-[21px] font-normal tracking-[-0.01em] text-cream opacity-[0.78]">
          Anmelden. Profil. Erstes Video. Du bist drin.
        </p>

        <a
          href="#"
          className="inline-flex items-center gap-[14px] border border-cream bg-cream px-[42px] py-[22px] font-body text-[16px] font-medium tracking-[0.04em] text-bordeaux no-underline transition-all duration-300 hover:-translate-y-0.5 hover:bg-transparent hover:text-cream"
        >
          Jetzt starten
          <span className="font-display text-[18px] font-light">→</span>
        </a>
      </div>
    </section>
  );
};

export default FinalCta;
