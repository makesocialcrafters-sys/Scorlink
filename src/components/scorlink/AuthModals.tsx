import { createContext, useContext, useState, ReactNode, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { toast } from "sonner";

type Mode = "signup" | "login" | "forgot" | null;

type AuthModalCtx = {
  open: (mode: Exclude<Mode, null>) => void;
  close: () => void;
};

const Ctx = createContext<AuthModalCtx>({ open: () => {}, close: () => {} });
export const useAuthModal = () => useContext(Ctx);

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.98.66-2.23 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.11A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.11V7.05H2.18A11 11 0 0 0 1 12c0 1.77.42 3.45 1.18 4.95l3.66-2.84z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.05l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
  </svg>
);

const inputCls =
  "w-full border border-bordeaux/30 bg-cream px-4 py-3 font-body text-[14px] text-bordeaux placeholder:text-bordeaux/40 focus:border-bordeaux focus:outline-none";

const primaryBtn =
  "inline-flex w-full items-center justify-center gap-2 border border-bordeaux bg-bordeaux px-6 py-[14px] font-body text-[14px] font-medium tracking-[0.04em] text-cream transition-all hover:bg-cream hover:text-bordeaux disabled:opacity-50";

const secondaryBtn =
  "inline-flex w-full items-center justify-center gap-3 border border-bordeaux bg-transparent px-6 py-[12px] font-body text-[14px] font-medium tracking-[0.02em] text-bordeaux transition-all hover:bg-bordeaux hover:text-cream disabled:opacity-50";

const linkBtn =
  "font-mono-meta text-[11px] font-medium uppercase tracking-[0.22em] text-bordeaux underline-offset-4 hover:underline";

export const AuthModalProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<Mode>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const close = () => {
    setMode(null);
    setEmail("");
    setPassword("");
  };
  const open = (m: Exclude<Mode, null>) => setMode(m);

  const handleGoogle = async () => {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/dashboard`,
    });
    if (result.error) {
      toast.error("Google-Anmeldung fehlgeschlagen");
      setBusy(false);
      return;
    }
    if (result.redirected) return;
    close();
    navigate("/dashboard");
  };

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/dashboard` },
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Willkommen bei Scorlink");
    close();
    navigate("/dashboard");
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    close();
    navigate("/dashboard");
  };

  const handleForgot = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Check deine E-Mail für den Reset-Link");
    setMode("login");
  };

  const isOpen = mode !== null;

  return (
    <Ctx.Provider value={{ open, close }}>
      {children}
      <Dialog open={isOpen} onOpenChange={(o) => !o && close()}>
        <DialogContent className="border-bordeaux bg-cream text-bordeaux sm:max-w-[440px]">
          {mode === "signup" && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-[36px] font-normal leading-none tracking-[-0.03em] text-bordeaux">
                  Werd <span className="font-display-italic">Spieler.</span>
                </DialogTitle>
                <DialogDescription className="font-body text-[13px] text-bordeaux/70">
                  Erste Analyse gratis · Keine Kreditkarte
                </DialogDescription>
              </DialogHeader>
              <button onClick={handleGoogle} disabled={busy} className={secondaryBtn}>
                <GoogleIcon /> Mit Google anmelden
              </button>
              <div className="flex items-center gap-3 py-1">
                <div className="h-px flex-1 bg-bordeaux/20" />
                <span className="font-mono-meta text-[10px] uppercase tracking-[0.25em] text-bordeaux/50">oder</span>
                <div className="h-px flex-1 bg-bordeaux/20" />
              </div>
              <form onSubmit={handleSignup} className="flex flex-col gap-3">
                <input
                  type="email"
                  required
                  placeholder="E-Mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputCls}
                />
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="Passwort"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputCls}
                />
                <button type="submit" disabled={busy} className={primaryBtn}>
                  Konto erstellen →
                </button>
              </form>
              <div className="text-center">
                <button onClick={() => setMode("login")} className={linkBtn}>
                  Schon dabei? Einloggen
                </button>
              </div>
            </>
          )}

          {mode === "login" && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-[36px] font-normal leading-none tracking-[-0.03em] text-bordeaux">
                  Willkommen <span className="font-display-italic">zurück.</span>
                </DialogTitle>
                <DialogDescription className="font-body text-[13px] text-bordeaux/70">
                  Melde dich an, um weiterzumachen
                </DialogDescription>
              </DialogHeader>
              <button onClick={handleGoogle} disabled={busy} className={secondaryBtn}>
                <GoogleIcon /> Mit Google anmelden
              </button>
              <div className="flex items-center gap-3 py-1">
                <div className="h-px flex-1 bg-bordeaux/20" />
                <span className="font-mono-meta text-[10px] uppercase tracking-[0.25em] text-bordeaux/50">oder</span>
                <div className="h-px flex-1 bg-bordeaux/20" />
              </div>
              <form onSubmit={handleLogin} className="flex flex-col gap-3">
                <input
                  type="email"
                  required
                  placeholder="E-Mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputCls}
                />
                <input
                  type="password"
                  required
                  placeholder="Passwort"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputCls}
                />
                <button type="submit" disabled={busy} className={primaryBtn}>
                  Einloggen →
                </button>
              </form>
              <div className="flex items-center justify-between">
                <button onClick={() => setMode("forgot")} className={linkBtn}>
                  Passwort vergessen?
                </button>
                <button onClick={() => setMode("signup")} className={linkBtn}>
                  Konto erstellen
                </button>
              </div>
            </>
          )}

          {mode === "forgot" && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-[36px] font-normal leading-none tracking-[-0.03em] text-bordeaux">
                  Passwort <span className="font-display-italic">zurücksetzen.</span>
                </DialogTitle>
                <DialogDescription className="font-body text-[13px] text-bordeaux/70">
                  Wir schicken dir einen Reset-Link per E-Mail
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleForgot} className="flex flex-col gap-3">
                <input
                  type="email"
                  required
                  placeholder="E-Mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputCls}
                />
                <button type="submit" disabled={busy} className={primaryBtn}>
                  Reset-Link senden →
                </button>
              </form>
              <div className="text-center">
                <button onClick={() => setMode("login")} className={linkBtn}>
                  Zurück zum Login
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Ctx.Provider>
  );
};
