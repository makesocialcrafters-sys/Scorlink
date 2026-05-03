import { Link, useParams } from "react-router-dom";

type Section = { heading: string; body: React.ReactNode };

const CONTACT = (
  <>
    <p>Scorlink</p>
    <p>Omar</p>
    <p>Wien, Österreich</p>
    <p>
      E-Mail:{" "}
      <a href="mailto:omar@scorlink.com" className="underline">
        omar@scorlink.com
      </a>
    </p>
    <p>
      Telefon:{" "}
      <a href="tel:+436764646183" className="underline">
        0676 4646 183
      </a>
    </p>
  </>
);

const PAGES: Record<string, { title: string; sections: Section[] }> = {
  impressum: {
    title: "Impressum",
    sections: [
      {
        heading: "Anbieter",
        body: CONTACT,
      },
      {
        heading: "Verantwortlich für den Inhalt",
        body: <p>Omar, omar@scorlink.com</p>,
      },
      {
        heading: "Haftungsausschluss",
        body: (
          <p>
            Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links.
            Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
          </p>
        ),
      },
    ],
  },
  datenschutz: {
    title: "Datenschutz",
    sections: [
      {
        heading: "Verantwortlicher",
        body: CONTACT,
      },
      {
        heading: "Welche Daten wir erheben",
        body: (
          <p>
            Wenn du dich auf die Warteliste einträgst, speichern wir deinen Namen, dein Geschlecht,
            deine Position und deine E-Mail-Adresse. Diese Daten werden ausschließlich genutzt, um dich
            über den Start von Scorlink zu informieren.
          </p>
        ),
      },
      {
        heading: "Speicherung",
        body: (
          <p>
            Die Daten werden auf abgesicherten Servern unseres Backend-Anbieters in der EU gespeichert.
            Eine Weitergabe an Dritte zu Werbezwecken erfolgt nicht.
          </p>
        ),
      },
      {
        heading: "Deine Rechte",
        body: (
          <p>
            Du hast jederzeit das Recht auf Auskunft, Berichtigung, Löschung und Widerspruch. Schreib
            uns dafür einfach an{" "}
            <a href="mailto:omar@scorlink.com" className="underline">
              omar@scorlink.com
            </a>
            .
          </p>
        ),
      },
    ],
  },
  agb: {
    title: "AGB",
    sections: [
      {
        heading: "Geltungsbereich",
        body: (
          <p>
            Diese Allgemeinen Geschäftsbedingungen gelten für die Nutzung der Plattform Scorlink
            sowie für die Eintragung in die Warteliste.
          </p>
        ),
      },
      {
        heading: "Warteliste",
        body: (
          <p>
            Mit der Eintragung in die Warteliste erklärst du dich einverstanden, dass wir dich per
            E-Mail über den Launch und Neuigkeiten zu Scorlink informieren. Eine Abmeldung ist
            jederzeit möglich.
          </p>
        ),
      },
      {
        heading: "Haftung",
        body: (
          <p>
            Scorlink befindet sich aktuell in der Aufbauphase. Eine durchgehende Verfügbarkeit der
            Plattform wird nicht garantiert.
          </p>
        ),
      },
      {
        heading: "Kontakt",
        body: CONTACT,
      },
    ],
  },
};

const Legal = () => {
  const { slug } = useParams<{ slug: string }>();
  const page = slug ? PAGES[slug] : undefined;

  if (!page) {
    return (
      <main className="min-h-screen bg-cream px-6 py-20 text-bordeaux md:px-10">
        <div className="mx-auto max-w-[760px]">
          <h1 className="font-display text-4xl">Seite nicht gefunden.</h1>
          <Link to="/" className="font-mono-meta mt-6 inline-block text-[11px] uppercase tracking-[0.28em] underline">
            ← Zurück
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream text-bordeaux">
      <nav className="flex items-center justify-between border-b border-bordeaux px-6 py-6 md:px-10">
        <Link to="/" className="font-display text-[23px] font-semibold tracking-[-0.02em] text-bordeaux no-underline">
          Scorlink
        </Link>
        <Link
          to="/"
          className="font-mono-meta text-[11px] font-medium uppercase tracking-[0.28em] text-bordeaux no-underline opacity-65 hover:opacity-100"
        >
          ← Zurück
        </Link>
      </nav>

      <section className="px-6 py-20 md:px-10">
        <div className="mx-auto max-w-[760px]">
          <div className="font-mono-meta mb-6 text-[11px] font-medium uppercase tracking-[0.32em] opacity-65">
            Rechtliches
          </div>
          <h1
            className="font-display mb-12 text-bordeaux"
            style={{ fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 0.95, letterSpacing: "-0.04em", fontWeight: 300 }}
          >
            {page.title}
          </h1>

          <div className="flex flex-col gap-10">
            {page.sections.map((s) => (
              <div key={s.heading}>
                <h2 className="font-display mb-3 text-2xl font-normal tracking-[-0.01em]">{s.heading}</h2>
                <div className="font-body space-y-2 text-[15px] leading-[1.65] text-bordeaux/85">{s.body}</div>
              </div>
            ))}
          </div>

          <p className="font-mono-meta mt-16 text-[11px] uppercase tracking-[0.28em] opacity-55">
            Stand: Mai 2026
          </p>
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

export default Legal;
