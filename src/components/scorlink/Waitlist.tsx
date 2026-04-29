import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const emailSchema = z.string().trim().email({ message: "Bitte gib eine gültige E-Mail ein." }).max(255);

const Waitlist = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("waitlist").insert({ email: parsed.data.toLowerCase() });
    setLoading(false);
    if (error) {
      if (error.code === "23505") {
        setSuccess(true);
        return;
      }
      toast.error("Etwas ist schiefgelaufen. Versuch es nochmal.");
      return;
    }
    setSuccess(true);
  };

  return (
    <section id="waitlist" className="relative overflow-hidden border-b border-bordeaux bg-cream px-6 py-[180px] text-center text-bordeaux md:px-10">
      <div className="relative z-[2] mx-auto max-w-[820px]">
        <div className="font-mono-meta mb-9 flex items-center justify-center gap-[14px] text-[11px] font-medium uppercase tracking-[0.32em] text-bordeaux opacity-65">
          <span className="h-px w-9 bg-bordeaux/50" />
          Warteliste
          <span className="h-px w-9 bg-bordeaux/50" />
        </div>

        <h2
          className="font-display mb-10 text-bordeaux"
          style={{
            fontSize: "clamp(72px, 11vw, 160px)",
            lineHeight: 0.95,
            letterSpacing: "-0.045em",
            fontWeight: 300,
          }}
        >
          Sei <span className="font-display-italic" style={{ fontWeight: 400 }}>dabei.</span>
        </h2>

        <p className="font-display-italic mx-auto mb-14 max-w-[600px] text-[clamp(19px,1.7vw,23px)] font-normal leading-[1.45] tracking-[-0.01em] text-bordeaux opacity-[0.78]">
          Scorlink startet bald in Wien. Trag dich ein — wir schreiben dir wenn es losgeht.
        </p>

        {success ? (
          <div
            className="font-display mx-auto inline-block border border-bordeaux px-10 py-7 text-bordeaux"
            style={{ fontSize: "clamp(24px, 3vw, 36px)", letterSpacing: "-0.02em", fontWeight: 300 }}
          >
            Du bist dabei. <span className="font-display-italic" style={{ fontWeight: 400 }}>Wir melden uns.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto flex max-w-[560px] flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="deine@email.at"
              disabled={loading}
              className="font-body flex-1 border border-bordeaux bg-cream px-5 py-[19px] text-[15px] tracking-[0.01em] text-bordeaux placeholder:text-bordeaux/40 focus:outline-none focus:ring-1 focus:ring-bordeaux disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading}
              className="font-body inline-flex items-center justify-center gap-[14px] border border-bordeaux bg-bordeaux px-9 py-[19px] text-[14px] font-medium tracking-[0.04em] text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-cream hover:text-bordeaux disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "..." : "Jetzt eintragen"}
              {!loading && <span className="font-display text-[18px] font-light">→</span>}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Waitlist;
