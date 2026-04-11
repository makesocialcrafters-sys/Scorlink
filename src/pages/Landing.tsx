import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FootballFieldBg from "@/components/FootballFieldBg";

const steps = [
  { emoji: "⚽", title: "PROFIL ANLEGEN", desc: "Erstelle dein Spielerprofil in unter 2 Minuten." },
  { emoji: "🎥", title: "VIDEO HOCHLADEN", desc: "Lade deine besten Tore und Aktionen als Highlight hoch." },
  { emoji: "💰", title: "LINK TEILEN & KASSIEREN", desc: "Teile deinen Link und lass dich von Fans supporten." },
];

const Landing = () => (
  <div className="min-h-screen" style={{ background: "#080808" }}>
    {/* Hero */}
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center">
      <FootballFieldBg />
      <div className="relative z-10 max-w-4xl animate-fade-up">
        <h1 className="font-display text-6xl sm:text-8xl md:text-9xl leading-[0.9] mb-6" style={{ color: "#fff" }}>
          DEIN TOR.{" "}
          <span style={{ color: "#00C853" }}>DEIN FAME.</span>{" "}
          DEIN SUPPORT.
        </h1>
        <p className="text-lg sm:text-xl max-w-xl mx-auto mb-10" style={{ color: "#888" }}>
          Die Plattform, auf der Amateurfußballer ihre besten Momente teilen – und Fans sie supporten.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link to="/register">
            <Button
              size="lg"
              className="text-lg px-10 py-6 rounded-full font-bold"
              style={{ background: "#00C853", color: "#000", boxShadow: "0 0 24px #00C85350" }}
            >
              Kostenloses Profil erstellen
            </Button>
          </Link>
          <Link to="/entdecken">
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-10 py-6 rounded-full"
              style={{ borderColor: "#333", color: "#fff", background: "transparent" }}
            >
              Spieler entdecken
            </Button>
          </Link>
        </div>
      </div>
    </section>

    {/* How it works */}
    <section className="py-24 px-4">
      <div className="container max-w-5xl">
        <h2 className="font-display text-4xl sm:text-5xl text-center mb-16" style={{ color: "#fff" }}>SO EINFACH GEHT'S</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div
              key={i}
              className="rounded-xl p-8 text-center"
              style={{ background: "#111", border: "1px solid #1f1f1f" }}
            >
              <div className="text-5xl mb-4">{s.emoji}</div>
              <h3 className="font-display text-2xl mb-3" style={{ color: "#fff" }}>{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#888" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Bottom CTA */}
    <section className="py-16 px-4 text-center" style={{ background: "#00C853" }}>
      <div className="container max-w-3xl">
        <h2 className="font-display text-4xl sm:text-5xl mb-4" style={{ color: "#000" }}>
          BEREIT FÜR DEINEN MOMENT?
        </h2>
        <p className="mb-8 text-lg" style={{ color: "rgba(0,0,0,0.6)" }}>
          Erstelle jetzt dein kostenloses Profil und zeig der Welt deine Highlights.
        </p>
        <Link to="/register">
          <Button
            size="lg"
            className="rounded-full px-10 py-6 text-lg font-bold"
            style={{ background: "#000", color: "#fff" }}
          >
            Jetzt starten →
          </Button>
        </Link>
      </div>
    </section>
  </div>
);

export default Landing;
