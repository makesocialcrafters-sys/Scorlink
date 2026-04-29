import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const POSITIONS = ["TW", "IV", "AV", "DM", "CM", "OM", "LF", "RF", "ST"] as const;
const FEET = ["Links", "Rechts", "Beidfüßig"] as const;
const LEAGUES = ["Hobbyliga", "Stadtliga", "Landesliga", "Regionalliga", "3. Liga", "Akademie"] as const;

const schema = z.object({
  full_name: z.string().trim().min(2, "Name zu kurz").max(100),
  age: z.coerce.number().int().min(6, "Ungültiges Alter").max(60),
  city: z.string().trim().min(1, "Stadt angeben").max(100),
  club: z.string().trim().min(1, "Verein angeben").max(100),
  position: z.enum(POSITIONS),
  dominant_foot: z.enum(FEET),
  league: z.enum(LEAGUES),
});

type Form = {
  full_name: string;
  age: string;
  city: string;
  club: string;
  position: (typeof POSITIONS)[number] | "";
  dominant_foot: (typeof FEET)[number] | "";
  league: (typeof LEAGUES)[number] | "";
};

const Onboarding = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitting, setSubmitting] = useState(false);
  const [checking, setChecking] = useState(true);

  const [form, setForm] = useState<Form>({
    full_name: "",
    age: "",
    city: "",
    club: "",
    position: "",
    dominant_foot: "",
    league: "",
  });

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/", { replace: true });
      return;
    }
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

  const canNext1 =
    form.full_name.trim().length >= 2 &&
    form.age !== "" &&
    Number(form.age) >= 6 &&
    Number(form.age) <= 60 &&
    form.city.trim() !== "" &&
    form.club.trim() !== "";
  const canNext2 = form.position !== "" && form.dominant_foot !== "";
  const canSubmit = form.league !== "";

  const handleSubmit = async () => {
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
        city: d.city,
        club: d.club,
        position: d.position,
        dominant_foot: d.dominant_foot,
        league: d.league,
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

  const Pill = ({
    active,
    onClick,
    children,
  }: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`border border-bordeaux px-4 py-2 font-body text-[13px] font-medium tracking-[0.04em] transition-all ${
        active ? "bg-bordeaux text-cream" : "bg-transparent text-bordeaux hover:bg-bordeaux/10"
      }`}
    >
      {children}
    </button>
  );

  return (
    <main className="min-h-screen bg-cream text-bordeaux">
      <nav className="sticky top-0 z-[100] flex items-center justify-between border-b border-bordeaux bg-cream px-6 py-6 md:px-10">
        <a href="/" className="font-display text-[23px] font-semibold tracking-[-0.02em] text-bordeaux no-underline">
          Scorlink
        </a>
      </nav>

      <section className="px-6 py-[80px] md:px-10">
        <div className="mx-auto max-w-[680px]">
          {/* Progress */}
          <div className="mb-9 flex items-center justify-between">
            <div className="font-mono-meta flex items-center gap-[14px] text-[11px] font-medium uppercase tracking-[0.25em] text-bordeaux opacity-70">
              <span className="h-px w-8 bg-bordeaux" />
              Schritt {step} von 3
            </div>
            <div className="flex gap-2">
              {[1, 2, 3].map((n) => (
                <span
                  key={n}
                  className={`h-px w-10 ${n <= step ? "bg-bordeaux" : "bg-bordeaux/20"}`}
                />
              ))}
            </div>
          </div>

          <h1 className="font-display mb-6 text-[clamp(40px,6vw,72px)] font-normal leading-[0.95] tracking-[-0.045em] text-bordeaux">
            {step === 1 && (
              <>
                Wer <span className="font-display-italic">bist du?</span>
              </>
            )}
            {step === 2 && (
              <>
                Wo <span className="font-display-italic">spielst du?</span>
              </>
            )}
            {step === 3 && (
              <>
                Welches <span className="font-display-italic">Niveau?</span>
              </>
            )}
          </h1>

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-7">
              <div>
                <label className={labelCls}>Vollständiger Name</label>
                <input
                  className={inputCls}
                  value={form.full_name}
                  onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                  placeholder="Max Mustermann"
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
                  />
                </div>
                <div>
                  <label className={labelCls}>Stadt</label>
                  <input
                    className={inputCls}
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="Wien"
                  />
                </div>
              </div>
              <div>
                <label className={labelCls}>Verein</label>
                <input
                  className={inputCls}
                  value={form.club}
                  onChange={(e) => setForm({ ...form, club: e.target.value })}
                  placeholder="SK Rapid Wien"
                />
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  disabled={!canNext1}
                  onClick={() => setStep(2)}
                  className="w-full border border-bordeaux bg-bordeaux px-6 py-4 font-body text-[14px] font-medium tracking-[0.04em] text-cream transition-all hover:bg-transparent hover:text-bordeaux disabled:opacity-40 disabled:hover:bg-bordeaux disabled:hover:text-cream md:w-auto"
                >
                  Weiter →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-9">
              <div>
                <label className={labelCls}>Position</label>
                <div className="flex flex-wrap gap-2">
                  {POSITIONS.map((p) => (
                    <Pill
                      key={p}
                      active={form.position === p}
                      onClick={() => setForm({ ...form, position: p })}
                    >
                      {p}
                    </Pill>
                  ))}
                </div>
              </div>
              <div>
                <label className={labelCls}>Starker Fuß</label>
                <div className="flex flex-wrap gap-2">
                  {FEET.map((f) => (
                    <Pill
                      key={f}
                      active={form.dominant_foot === f}
                      onClick={() => setForm({ ...form, dominant_foot: f })}
                    >
                      {f}
                    </Pill>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-6 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="border border-bordeaux bg-transparent px-6 py-4 font-body text-[14px] font-medium tracking-[0.04em] text-bordeaux transition-all hover:bg-bordeaux hover:text-cream"
                >
                  ← Zurück
                </button>
                <button
                  type="button"
                  disabled={!canNext2}
                  onClick={() => setStep(3)}
                  className="border border-bordeaux bg-bordeaux px-6 py-4 font-body text-[14px] font-medium tracking-[0.04em] text-cream transition-all hover:bg-transparent hover:text-bordeaux disabled:opacity-40 disabled:hover:bg-bordeaux disabled:hover:text-cream"
                >
                  Weiter →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-9">
              <div>
                <label className={labelCls}>Liga</label>
                <div className="flex flex-wrap gap-2">
                  {LEAGUES.map((l) => (
                    <Pill
                      key={l}
                      active={form.league === l}
                      onClick={() => setForm({ ...form, league: l })}
                    >
                      {l}
                    </Pill>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-6 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="border border-bordeaux bg-transparent px-6 py-4 font-body text-[14px] font-medium tracking-[0.04em] text-bordeaux transition-all hover:bg-bordeaux hover:text-cream"
                >
                  ← Zurück
                </button>
                <button
                  type="button"
                  disabled={!canSubmit || submitting}
                  onClick={handleSubmit}
                  className="border border-bordeaux bg-bordeaux px-6 py-4 font-body text-[14px] font-medium tracking-[0.04em] text-cream transition-all hover:bg-transparent hover:text-bordeaux disabled:opacity-40 disabled:hover:bg-bordeaux disabled:hover:text-cream"
                >
                  {submitting ? "Wird gespeichert…" : "Profil anlegen →"}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Onboarding;
