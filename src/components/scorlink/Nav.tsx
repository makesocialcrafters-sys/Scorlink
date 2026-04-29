import { useAuthModal } from "@/components/scorlink/AuthModals";

const Nav = () => {
  const { open } = useAuthModal();
  return (
    <nav className="sticky top-0 z-[100] flex items-center justify-between border-b border-bordeaux bg-cream px-6 py-6 md:px-10">
      <a href="#" className="flex items-center gap-3 text-bordeaux no-underline">
        <span className="font-display text-[23px] font-semibold tracking-[-0.02em]">Scorlink</span>
      </a>
      <button
        onClick={() => open("login")}
        className="border border-bordeaux bg-transparent px-5 py-[9px] font-body text-[13px] font-medium tracking-[0.02em] text-bordeaux transition-all duration-300 hover:bg-bordeaux hover:text-cream"
      >
        Einloggen →
      </button>
    </nav>
  );
};

export default Nav;
