const facts = [
  {
    num: "50%",
    label: "aller Akademie-Spieler verlassen das System bevor sie 16 sind — meist still und ohne Alternative.",
    source: "Premier League Report · 2012",
  },
  {
    num: "98%",
    label: "der englischen Akademie-Spieler mit 16 spielen mit 18 nicht mehr in den Top-5-Ligen.",
    source: "Calvin · No Hunger in Paradise",
  },
  {
    num: "4%",
    label: "der ausgebildeten 13- bis 18-jährigen Akademie-Talente schaffen den Sprung ins Profi-Geschäft.",
    source: "University of Essex · 2024",
  },
  {
    num: "55%",
    label: "der freigestellten Spieler zeigen klinisch relevante psychische Belastungen drei Wochen nach dem Aus.",
    source: "Dr. Blakelock · Teesside University",
  },
];

const Facts = () => {
  return (
    <section className="relative overflow-hidden border-b border-bordeaux bg-cream px-6 py-[140px] md:px-10">
      <div className="relative z-[2] mx-auto max-w-[1280px]">
        <div className="font-mono-meta mb-7 flex items-center gap-[14px] text-[11px] font-medium uppercase tracking-[0.28em] text-bordeaux opacity-70">
          <span className="h-px w-8 bg-bordeaux/60" />
          Die ehrlichen Zahlen
        </div>

        <h2 className="font-display mb-16 max-w-[1000px] text-[clamp(48px,7vw,92px)] font-normal leading-none tracking-[-0.04em] text-bordeaux">
          Talente werden nicht entdeckt.<br />
          <span className="font-display-italic">Sie verschwinden.</span>
        </h2>

        <div className="mt-16 grid grid-cols-1 border-t border-bordeaux lg:grid-cols-2">
          {facts.map((f, i) => {
            const isRight = i % 2 === 1;
            return (
              <div
                key={f.num}
                className={`relative border-b border-bordeaux py-16 ${
                  isRight ? "lg:border-r-0 lg:pl-12 lg:pr-0" : "lg:border-r lg:border-r-bordeaux/20 lg:pl-0 lg:pr-12"
                }`}
              >
                <div
                  className="font-display-italic mb-7 text-bordeaux"
                  style={{
                    fontSize: "clamp(80px, 11vw, 130px)",
                    lineHeight: 0.88,
                    letterSpacing: "-0.05em",
                    fontWeight: 300,
                  }}
                >
                  {f.num}
                </div>
                <p className="font-display mb-5 max-w-[500px] text-[22px] font-normal leading-[1.4] tracking-[-0.005em] text-bordeaux">
                  {f.label}
                </p>
                <div className="font-mono-meta text-[10px] font-medium uppercase tracking-[0.24em] text-bordeaux opacity-45">
                  {f.source}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Facts;
