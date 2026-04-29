import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const POSITIONS = ["TW", "IV", "AV", "DM", "CM", "OM", "LF", "RF", "ST"] as const;
const FEET = ["Links", "Rechts", "Beidfüßig"] as const;

const schema = z.object({
  full_name: z.string().trim().min(2, "Name zu kurz").max(100),
  age: z.coerce.number().int().min(6, "Ungültiges Alter").max(60),
  club: z.string().trim().min(1, "Verein angeben").max(100),
  position: z.enum(POSITIONS),
  dominant_foot: z.enum(FEET),
  league: z.string().trim().min(1, "Liga angeben").max(100),
  city: z.string().trim().min(1, "Stadt angeben").max(100),
});

const Onboarding = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [checking, setChecking] = useState(true);

  const [form, setForm] = useState({
    full_name: "",
    age: "",
    club: "",
    position: "" as (typeof POSITIONS)[number] | "",
    dominant_foot: "" as (typeof FEET)[number] | "",
    league: "",
    city: "",
  });

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/", { replace: true });
      return;
    }
    // If profile already exists, skip onboarding
    (async () => {
      const { data } = await supabase
        .from("profiles")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();
      if (data) navigate("/dashboard", { replace: true });
      else setChecking(false);
    })();
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }

    setSubmitting(true);
    const d = parsed.data;
    const { error } = await supabase.from("profiles").insert([
      {
        user_id: user.id,
        full_name: d.full_name,
        age: d.age,
        club: d.club,
        position: d.position,
        dominant_foot: d.dominant_foot,
        league: d.league,
        city: d.city,
      },
    ]);
    setSubmitting(false);

    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Profil angelegt.");
    navigate("/dashboard", { replace: true });
  };

  if (loading || checking) {
    return <div className="min-h-screen bg-cream" />;
  }

  const inputCls =
    "w-full border border-bordeaux bg-transparent px-4 py-3 font-body text-[15px] text-bordeaux placeholder:text-bordeaux/40 focus:outline-none focus:ring-2 focus:ring-bordeaux/20";
  const labelCls =
    "font-mono-meta mb-2 block text-[11px] font-medium uppercase tracking-[0.25em] text-bordeaux/70";

  return (
    <main className="min-h-screen bg-cream text-bordeaux">
      <nav className="sticky top-0 z-[100] flex items-center justify-between border-b border-bordeaux bg-cream px-6 py-6 md:px-10">
        <a href="/" className="font-display text-[23px] font-semibold tracking-[-0.02em] text-bordeaux no-underline">
          Scorlink
        </a>
      </nav>

      <section className="px-6 py-[80px] md:px-10">
        <div className="mx-auto max-w-[680px]">
          <div className="font-mono-meta mb-9 flex items-center gap-[14px] text-[11px] font-medium uppercase tracking-[0.25em] text-bordeaux opacity-70">
            <span className="h-px w-8 bg-bordeaux" />
            01 — Profil
          </div>
          <h1 className="font-display mb-6 text-[clamp(40px,6vw,72px)] font-normal leading-[0.95] tracking-[-0.045em] text-bordeaux">
            Werd <span className="font-display-italic">sichtbar.</span>
          </h1>
          <p className="font-display-italic mb-12 max-w-[520px] text-[clamp(16px,1.4vw,19px)] leading-[1.5] text-bordeaux opacity-[0.78]">
            Ein paar Eckdaten — danach kannst du dein erstes Video hochladen.
          </p>

          <form onSubmit={handleSubmit} className="space-y-7">
            <div>
              <label className={labelCls}>Vollständiger Name</label>
              <input
                className={inputCls}
                value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                placeholder="Max Mustermann"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
              <div>
                <label className={labelCls}>Alter</label>
                <input
                  type="number"
                  min={6}
                  max={60}
                  className={inputCls}
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                  placeholder="18"
                  required
                />
              </div>
              <div>
                <label className={labelCls}>Stadt</label>
                <input
                  className={inputCls}
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="Wien"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
              <div>
                <label className={labelCls}>Verein</label>
                <input
                  className={inputCls}
                  value={form.club}
                  onChange={(e) => setForm({ ...form, club: e.target.value })}
                  placeholder="SK Rapid Wien"
                  required
                />
              </div>
              <div>
                <label className={labelCls}>Liga</label>
                <input
                  className={inputCls}
                  value={form.league}
                  onChange={(e) => setForm({ ...form, league: e.target.value })}
                  placeholder="Bundesliga U18"
                  required
                />
              </div>
            </div>

            <div>
              <label className={labelCls}>Position</label>
              <div className="flex flex-wrap gap-2">
                {POSITIONS.map((p) => (
                  <button
                    type="button"
                    key={p}
                    onClick={() => setForm({ ...form, position: p })}
                    className={`border border-bordeaux px-4 py-2 font-body text-[13px] font-medium tracking-[0.04em] transition-all ${
                      form.position === p
                        ? "bg-bordeaux text-cream"
                        : "bg-transparent text-bordeaux hover:bg-bordeaux/10"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={labelCls}>Starker Fuß</label>
              <div className="flex flex-wrap gap-2">
                {FEET.map((f) => (
                  <button
                    type="button"
                    key={f}
                    onClick={() => setForm({ ...form, dominant_foot: f })}
                    className={`border border-bordeaux px-4 py-2 font-body text-[13px] font-medium tracking-[0.04em] transition-all ${
                      form.dominant_foot === f
                        ? "bg-bordeaux text-cream"
                        : "bg-transparent text-bordeaux hover:bg-bordeaux/10"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={submitting}
                className="w-full border border-bordeaux bg-bordeaux px-6 py-4 font-body text-[14px] font-medium tracking-[0.04em] text-cream transition-all hover:bg-transparent hover:text-bordeaux disabled:opacity-50 md:w-auto"
              >
                {submitting ? "Wird gespeichert…" : "Profil anlegen →"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Onboarding;
