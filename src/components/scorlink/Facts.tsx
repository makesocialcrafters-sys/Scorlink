const facts = [
  {
    num: "270M",
    label: "Menschen spielen weltweit aktiv Fußball — in über 200 Ländern, vom Bolzplatz bis zur Akademie.",
    source: "FIFA Big Count · Global",
  },
  {
    num: "24%",
    label: "der Jugendspieler weltweit verlassen den organisierten Fußball jedes Jahr — bei Mädchen sogar 27%.",
    source: "Møllerløkken et al. · Internationales Review · 2015",
  },
  {
    num: "130K",
    label: "professionelle Fußballer gibt es weltweit. Von 270 Millionen Spielern. Der Rest bleibt unsichtbar.",
    source: "FIFA Professional Football Report · 2023",
  },
  {
    num: "40%",
    label: "Dropout-Rate im Jugendsport in manchen Ländern. Die meisten hören auf weil sie keine Perspektive sehen.",
    source: "Frontiers in Sports · Globale Meta-Analyse · 2021",
  },
];

const Facts = () => {
  return (
    <section className="relative overflow-hidden border-b border-bordeaux bg-cream px-6 py-[140px] md:px-10">
      <div className="relative z-[2] mx-auto max-w-[1280px]">
        <div className="font-mono-meta mb-7 flex items-center gap-[14px] text-[11px] font-medium uppercase tracking-[0.28em] text-bordeaux opacity-70">
          <span className="h-px w-8 bg-bordeaux/60" />
          Weltweit · Die Zahlen
        </div>

        <h2 className="font-display mb-16 max-w-[1000px] text-[clamp(48px,7vw,92px)] font-normal leading-none tracking-[-0.04em] text-bordeaux">
          270 Millionen spielen.<br />
          <span className="font-display-italic">Fast keiner wird gesehen.</span>
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
