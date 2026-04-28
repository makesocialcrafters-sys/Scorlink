import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Passwort aktualisiert");
    navigate("/dashboard");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-6 text-bordeaux">
      <div className="w-full max-w-[440px]">
        <div className="font-mono-meta mb-7 flex items-center gap-[14px] text-[11px] font-medium uppercase tracking-[0.25em] text-bordeaux opacity-70">
          <span className="h-px w-8 bg-bordeaux" />
          Neues Passwort
        </div>
        <h1 className="font-display mb-9 text-[56px] font-normal leading-[0.92] tracking-[-0.04em] text-bordeaux">
          Setze dein <span className="font-display-italic">neues Passwort.</span>
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="password"
            required
            minLength={6}
            placeholder="Neues Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-bordeaux/30 bg-cream px-4 py-3 font-body text-[14px] text-bordeaux placeholder:text-bordeaux/40 focus:border-bordeaux focus:outline-none"
          />
          <button
            type="submit"
            disabled={busy}
            className="inline-flex items-center justify-center gap-2 border border-bordeaux bg-bordeaux px-6 py-[14px] font-body text-[14px] font-medium tracking-[0.04em] text-cream transition-all hover:bg-cream hover:text-bordeaux disabled:opacity-50"
          >
            Passwort speichern →
          </button>
        </form>
      </div>
    </main>
  );
};

export default ResetPassword;
