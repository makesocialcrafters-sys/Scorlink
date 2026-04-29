import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

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
      if (!data) navigate("/onboarding", { replace: true });
      else setChecking(false);
    })();
  }, [user, loading, navigate]);

  if (loading || !user || checking) {
    return <div className="min-h-screen bg-cream" />;
  }

  return (
    <main className="min-h-screen bg-cream text-bordeaux">
      <nav className="sticky top-0 z-[100] flex items-center justify-between border-b border-bordeaux bg-cream px-6 py-6 md:px-10">
        <a href="/" className="flex items-center gap-3 text-bordeaux no-underline">
          <svg viewBox="0 0 22 22" className="h-[22px] w-[22px]" aria-hidden="true">
            <circle cx="11" cy="11" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11 1 L11 21 M1 11 L21 11" stroke="currentColor" strokeWidth="0.8" />
          </svg>
          <span className="font-display text-[23px] font-semibold tracking-[-0.02em]">Scorlink</span>
        </a>
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            navigate("/");
          }}
          className="border border-bordeaux bg-transparent px-5 py-[9px] font-body text-[13px] font-medium tracking-[0.02em] text-bordeaux transition-all hover:bg-bordeaux hover:text-cream"
        >
          Ausloggen →
        </button>
      </nav>

      <section className="px-6 py-[120px] md:px-10">
        <div className="mx-auto max-w-[1280px]">
          <div className="font-mono-meta mb-9 flex items-center gap-[14px] text-[11px] font-medium uppercase tracking-[0.25em] text-bordeaux opacity-70">
            <span className="h-px w-8 bg-bordeaux" />
            Dein Dashboard
          </div>
          <h1 className="font-display mb-9 max-w-[1000px] text-[clamp(56px,8vw,120px)] font-normal leading-[0.92] tracking-[-0.045em] text-bordeaux">
            Servus,<br />
            <span className="font-display-italic">{user.email?.split("@")[0]}.</span>
          </h1>
          <p className="font-display-italic max-w-[580px] text-[clamp(18px,1.6vw,22px)] leading-[1.5] text-bordeaux opacity-[0.78]">
            Lade dein erstes Video hoch und werde sichtbar.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
