type Tier = {
  tier: string;
  name: string;
  price: string;
  period: string;
  features: { text: string; yes: boolean }[];
  cta: string;
  pro?: boolean;
};

const tiers: Tier[] = [
  {
    tier: "Tier · 01",
    name: "Free Kick",
    price: "€ 0",
    period: "Immer kostenlos",
    features: [
      { text: "Profil anlegen", yes: true },
      { text: "Eine Test-Analyse", yes: true },
      { text: "Sichtbar im Discover", yes: false },
      { text: "Wöchentliche Reports", yes: false },
      { text: "Volle Entwicklungs-Historie", yes: false },
    ],
    cta: "Kostenlos starten",
  },
  {
    tier: "Tier · 02",
    name: "Scorlink Pro",
    price: "€ 14,90",
    period: "Pro Monat · jederzeit kündbar",
    features: [
      { text: "Alles aus Free Kick", yes: true },
      { text: "Unbegrenzte Analysen", yes: true },
      { text: "Sichtbar im Discover", yes: true },
      { text: "Priorität bei Scouts", yes: true },
      { text: "Volle Entwicklungs-Historie", yes: true },
    ],
    cta: "Pro werden →",
    pro: true,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="relative border-b border-bordeaux bg-cream px-6 py-[140px] text-bordeaux md:px-10">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-20 text-center">
          <div className="font-mono-meta mb-7 inline-flex items-center justify-center gap-[14px] text-[11px] font-medium uppercase tracking-[0.28em] text-bordeaux opacity-70">
            Pricing
          </div>
          <h2 className="font-display mx-auto max-w-[900px] text-[clamp(48px,7vw,92px)] font-normal leading-none tracking-[-0.04em] text-bordeaux">
            Eine Stunde Coach.<br />
            <span className="font-display-italic">Oder ein Monat Scorlink.</span>
          </h2>
        </div>

        <div className="mx-auto grid max-w-[920px] grid-cols-1 border border-bordeaux md:grid-cols-2">
          {tiers.map((t, i) => {
            const isPro = !!t.pro;
            return (
              <div
                key={t.name}
                className={`relative flex flex-col px-10 pb-11 pt-12 ${
                  i === 0 ? "border-b border-bordeaux md:border-b-0 md:border-r" : ""
                } ${isPro ? "bg-bordeaux text-cream" : ""}`}
              >
                {isPro && (
                  <span className="font-mono-meta absolute -top-[10px] right-8 border border-bordeaux bg-cream px-[14px] py-[5px] text-[10px] font-medium uppercase tracking-[0.25em] text-bordeaux">
                    Empfohlen
                  </span>
                )}

                <div
                  className={`font-mono-meta mb-[22px] text-[11px] font-medium uppercase tracking-[0.28em] ${
                    isPro ? "text-cream opacity-65" : "text-bordeaux opacity-60"
                  }`}
                >
                  {t.tier}
                </div>

                <h3
                  className={`font-display mb-7 text-[48px] font-normal leading-none tracking-[-0.03em] ${
                    isPro ? "text-cream" : "text-bordeaux"
                  }`}
                >
                  {t.name}
                </h3>

                <div
                  className={`font-display-italic mb-2 ${isPro ? "text-cream" : "text-bordeaux"}`}
                  style={{ fontSize: 80, lineHeight: 1, letterSpacing: "-0.045em", fontWeight: 300 }}
                >
                  {t.price}
                </div>

                <div
                  className={`font-mono-meta mb-9 text-[11px] font-medium uppercase tracking-[0.24em] ${
                    isPro ? "text-cream opacity-60" : "text-bordeaux opacity-55"
                  }`}
                >
                  {t.period}
                </div>

                <ul className="font-display mb-10 flex list-none flex-col gap-4 text-[16px] font-normal">
                  {t.features.map((f, idx) => {
                    const isLast = idx === t.features.length - 1;
                    return (
                      <li
                        key={f.text}
                        className={`flex items-start gap-[14px] tracking-[-0.005em] ${
                          isLast ? "" : `border-b pb-[14px] ${isPro ? "border-cream/[0.12]" : "border-bordeaux/[0.12]"}`
                        }`}
                      >
                        <span className={`flex-shrink-0 font-medium ${f.yes ? "opacity-100" : "opacity-30"}`}>
                          {f.yes ? "✓" : "—"}
                        </span>
                        <span>{f.text}</span>
                      </li>
                    );
                  })}
                </ul>

                <a
                  href="#signup"
                  className={`mt-auto block border px-4 py-[18px] text-center font-body text-[14px] font-medium tracking-[0.04em] no-underline transition-all duration-300 ${
                    isPro
                      ? "border-cream bg-cream text-bordeaux hover:bg-transparent hover:text-cream"
                      : "border-bordeaux bg-bordeaux text-cream hover:bg-cream hover:text-bordeaux"
                  }`}
                >
                  {t.cta}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
