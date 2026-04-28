const Hero = () => {
  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden border-b border-bordeaux px-6 py-[120px] pb-[140px] md:px-10 md:pt-[120px]">
      {/* Field illustration */}
      <div className="pointer-events-none absolute right-[-8%] top-1/2 z-0 w-[65%] max-w-[880px] -translate-y-1/2 opacity-[0.18]">
        <svg viewBox="0 0 800 500" className="h-auto w-full" aria-hidden="true">
          <rect x="2" y="2" width="796" height="496" fill="none" stroke="hsl(var(--bordeaux))" strokeWidth="1.5" />
          <line x1="400" y1="2" x2="400" y2="498" stroke="hsl(var(--bordeaux))" strokeWidth="1.5" />
          <circle cx="400" cy="250" r="80" fill="none" stroke="hsl(var(--bordeaux))" strokeWidth="1.5" />
          <circle cx="400" cy="250" r="2" fill="hsl(var(--bordeaux))" />
          <rect x="2" y="125" width="120" height="250" fill="none" stroke="hsl(var(--bordeaux))" strokeWidth="1.5" />
          <rect x="678" y="125" width="120" height="250" fill="none" stroke="hsl(var(--bordeaux))" strokeWidth="1.5" />
          <rect x="2" y="195" width="50" height="110" fill="none" stroke="hsl(var(--bordeaux))" strokeWidth="1.5" />
          <rect x="748" y="195" width="50" height="110" fill="none" stroke="hsl(var(--bordeaux))" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="relative z-[2] mx-auto w-full max-w-[1280px]">
        <div className="mb-10 flex items-center gap-[14px] font-mono-meta text-[11px] font-medium uppercase tracking-[0.25em] text-bordeaux opacity-70">
          <span className="h-px w-8 bg-bordeaux" />
          The Amateur Football Magazine
        </div>

        <h1 className="font-display mb-9 max-w-[1000px] text-[clamp(72px,11vw,168px)] font-normal leading-[0.92] tracking-[-0.045em] text-bordeaux">
          Werd<br />
          <span className="font-display-italic">gesehen.</span>
        </h1>

        <p className="font-display-italic mb-[52px] max-w-[580px] text-[clamp(18px,1.6vw,22px)] font-normal leading-[1.5] tracking-[-0.005em] text-bordeaux opacity-[0.78]">
          Lade dein Spiel hoch. Bekomme die Coach-Analyse. Werde sichtbar — für Vereine, für Scouts, für dich selbst.
        </p>

        <div className="flex flex-wrap items-center gap-7">
          <button
            onClick={() => open("signup")}
            className="inline-flex items-center gap-[14px] border border-bordeaux bg-bordeaux px-9 py-[19px] font-body text-[14px] font-medium tracking-[0.04em] text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-cream hover:text-bordeaux"
          >
            Kostenlos starten
            <span className="font-display text-[18px] font-light">→</span>
          </button>
          <a
            href="#pricing"
            className="font-mono-meta border-b border-bordeaux pb-[5px] text-[11px] font-medium uppercase tracking-[0.22em] text-bordeaux no-underline opacity-70 transition-opacity duration-300 hover:opacity-100"
          >
            14 Tage gratis
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
