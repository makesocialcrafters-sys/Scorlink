const Nav = () => {
  return (
    <nav className="sticky top-0 z-[100] flex items-center justify-between border-b border-bordeaux bg-cream px-6 py-6 md:px-10">
      <a href="#" className="flex items-center gap-3 text-bordeaux no-underline">
        <svg viewBox="0 0 22 22" className="h-[22px] w-[22px]" aria-hidden="true">
          <circle cx="11" cy="11" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M11 1 L11 21 M1 11 L21 11" stroke="currentColor" strokeWidth="0.8" />
        </svg>
        <span className="font-display text-[23px] font-semibold tracking-[-0.02em]">Scorlink</span>
      </a>
      <a
        href="#signup"
        className="border border-bordeaux bg-transparent px-5 py-[9px] font-body text-[13px] font-medium tracking-[0.02em] text-bordeaux no-underline transition-all duration-300 hover:bg-bordeaux hover:text-cream"
      >
        Anmelden →
      </a>
    </nav>
  );
};

export default Nav;
