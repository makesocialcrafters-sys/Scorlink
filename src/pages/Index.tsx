import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const POSITIONS = ["TW", "IV", "AV", "DM", "CM", "OM", "LF", "RF", "ST"] as const;

const schema = z.object({
  full_name: z.string().trim().min(2, "Bitte gib deinen Namen ein.").max(80),
  position: z.enum(POSITIONS, { errorMap: () => ({ message: "Bitte wähl deine Position." }) }),
  email: z.string().trim().email("Bitte gib eine gültige E-Mail ein.").max(255),
});

const Index = () => {
  const [fullName, setFullName] = useState("");
  const [position, setPosition] = useState<string>("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ full_name: fullName, position, email });
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("waitlist").insert({
      email: parsed.data.email.toLowerCase(),
      full_name: parsed.data.full_name,
      position: parsed.data.position,
    });
    setLoading(false);
    if (error && error.code !== "23505") {
      toast.error("Etwas ist schiefgelaufen. Versuch es nochmal.");
      return;
    }
    setSuccess(true);
  };

  return (
    <main className="min-h-screen bg-cream text-bordeaux">
      <nav className="flex items-center justify-between border-b border-bordeaux px-6 py-6 md:px-10">
        <span className="font-display text-[23px] font-semibold tracking-[-0.02em]">Scorlink</span>
        <span className="font-mono-meta hidden text-[11px] font-medium uppercase tracking-[0.32em] text-bordeaux opacity-65 sm:inline">
          Wien · Coming Soon
        </span>
      </nav>

      <section className="relative flex min-h-[calc(100vh-89px)] items-center justify-center px-6 py-20 md:px-10">
        <div className="mx-auto w-full max-w-[760px] text-center">
          <div className="font-mono-meta mb-9 flex items-center justify-center gap-[14px] text-[11px] font-medium uppercase tracking-[0.32em] text-bordeaux opacity-65">
            <span className="h-px w-9 bg-bordeaux/50" />
            Warteliste
            <span className="h-px w-9 bg-bordeaux/50" />
          </div>

          <h1
            className="font-display mb-10 text-bordeaux"
            style={{
              fontSize: "clamp(64px, 10vw, 140px)",
              lineHeight: 0.95,
              letterSpacing: "-0.045em",
              fontWeight: 300,
            }}
          >
            Sei <span className="font-display-italic" style={{ fontWeight: 400 }}>dabei.</span>
          </h1>

          <p className="font-display-italic mx-auto mb-14 max-w-[560px] text-[clamp(18px,1.6vw,22px)] font-normal leading-[1.5] tracking-[-0.01em] text-bordeaux opacity-[0.78]">
            Scorlink ist die Plattform für Spieler, die nicht warten wollen, entdeckt zu werden. Trag dich ein —
            wir melden uns, sobald es in Wien losgeht.
          </p>

          {success ? (
            <div
              className="font-display mx-auto inline-block border border-bordeaux px-10 py-7 text-bordeaux"
              style={{ fontSize: "clamp(24px, 3vw, 36px)", letterSpacing: "-0.02em", fontWeight: 300 }}
            >
              Du bist dabei. <span className="font-display-italic" style={{ fontWeight: 400 }}>Wir melden uns.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-[520px] flex-col gap-4 text-left">
              <div>
                <label className="font-mono-meta mb-2 block text-[10px] font-medium uppercase tracking-[0.28em] text-bordeaux opacity-70">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Vor- und Nachname"
                  disabled={loading}
                  className="font-body w-full border border-bordeaux bg-cream px-5 py-[18px] text-[15px] tracking-[0.01em] text-bordeaux placeholder:text-bordeaux/40 focus:outline-none focus:ring-1 focus:ring-bordeaux disabled:opacity-50"
                />
              </div>

              <div>
                <label className="font-mono-meta mb-3 block text-[10px] font-medium uppercase tracking-[0.28em] text-bordeaux opacity-70">
                  Position
                </label>
                <div className="flex flex-wrap gap-2">
                  {POSITIONS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPosition(p)}
                      disabled={loading}
                      className={`font-body min-w-[56px] border border-bordeaux px-4 py-[10px] text-[13px] font-medium tracking-[0.04em] transition-all duration-200 ${
                        position === p
                          ? "bg-bordeaux text-cream"
                          : "bg-cream text-bordeaux hover:bg-bordeaux/10"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-mono-meta mb-2 block text-[10px] font-medium uppercase tracking-[0.28em] text-bordeaux opacity-70">
                  E-Mail
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="deine@email.at"
                  disabled={loading}
                  className="font-body w-full border border-bordeaux bg-cream px-5 py-[18px] text-[15px] tracking-[0.01em] text-bordeaux placeholder:text-bordeaux/40 focus:outline-none focus:ring-1 focus:ring-bordeaux disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="font-body mt-2 inline-flex items-center justify-center gap-[14px] border border-bordeaux bg-bordeaux px-9 py-[19px] text-[14px] font-medium tracking-[0.04em] text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-cream hover:text-bordeaux disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "..." : "Jetzt eintragen"}
                {!loading && <span className="font-display text-[18px] font-light">→</span>}
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="border-t border-bordeaux px-6 py-8 text-center md:px-10">
        <span className="font-mono-meta text-[11px] font-medium uppercase tracking-[0.32em] text-bordeaux opacity-65">
          © Scorlink 2026
        </span>
      </footer>
    </main>
  );
};

export default Index;
