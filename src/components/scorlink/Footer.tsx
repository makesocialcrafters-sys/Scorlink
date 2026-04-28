const Footer = () => {
  return (
    <footer className="font-mono-meta flex flex-col flex-wrap items-center justify-between gap-[18px] border-t border-bordeaux bg-cream px-6 py-10 text-[11px] font-medium uppercase tracking-[0.22em] text-bordeaux md:flex-row md:px-10">
      <div className="flex items-center gap-4">
        <span className="font-display text-[22px] font-semibold normal-case tracking-[-0.02em]">Scorlink</span>
        <span className="opacity-55">© MMXXVI · Wien</span>
      </div>

      <div className="flex gap-8">
        <a href="#" className="text-bordeaux no-underline opacity-60 transition-opacity duration-200 hover:opacity-100">
          Impressum
        </a>
        <a href="#" className="text-bordeaux no-underline opacity-60 transition-opacity duration-200 hover:opacity-100">
          Datenschutz
        </a>
        <a href="#" className="text-bordeaux no-underline opacity-60 transition-opacity duration-200 hover:opacity-100">
          Kontakt
        </a>
      </div>
    </footer>
  );
};

export default Footer;
