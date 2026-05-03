import { Link, useParams } from "react-router-dom";

type Section = { heading: string; body: React.ReactNode };

const CONTACT = (
  <>
    <p>Omar Al Azawi</p>
    <p>Einzelunternehmen</p>
    <p>Forsthausgasse 15/6/9</p>
    <p>1200 Wien, Österreich</p>
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

const DSGVO_CONTACT = (
  <>
    <p>Omar Al Azawi</p>
    <p>Forsthausgasse 15/6/9</p>
    <p>1200 Wien, Österreich</p>
    <p>
      E-Mail:{" "}
      <a href="mailto:omar@scorlink.com" className="underline">
        omar@scorlink.com
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
        heading: "Unternehmensgegenstand",
        body: <p>Einzelunternehmen — Betrieb der Plattform Scorlink.</p>,
      },
      {
        heading: "Verantwortlich für den Inhalt",
        body: (
          <p>
            Omar Al Azawi, Forsthausgasse 15/6/9, 1200 Wien, Österreich —{" "}
            <a href="mailto:omar@scorlink.com" className="underline">
              omar@scorlink.com
            </a>
          </p>
        ),
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
        heading: "§ 01 Verantwortlicher",
        body: (
          <>
            <p>Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:</p>
            <div className="mt-3">{DSGVO_CONTACT}</div>
          </>
        ),
      },
      {
        heading: "§ 02 Welche Daten wir erheben",
        body: (
          <>
            <p>
              Im Rahmen der Waitlist und der Registrierung erheben wir folgende personenbezogene Daten:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li><strong>Name</strong> — zur persönlichen Ansprache</li>
              <li><strong>E-Mail-Adresse</strong> — für Kommunikation und Kontozugang</li>
              <li><strong>Position</strong> — deine Spielposition auf dem Fußballfeld (z.B. Stürmer, Torwart)</li>
              <li><strong>Geschlecht</strong> — zur positionsspezifischen Analyse und Kategorisierung</li>
            </ul>
            <p className="mt-3">
              Wir erheben ausschließlich Daten, die für den Betrieb der Plattform notwendig sind. Es werden
              keine Daten erhoben, die über diesen Zweck hinausgehen.
            </p>
          </>
        ),
      },
      {
        heading: "§ 03 Zweck der Datenverarbeitung",
        body: (
          <>
            <p>Deine Daten werden ausschließlich für folgende Zwecke verarbeitet:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Aufnahme in die Waitlist und Benachrichtigung beim Launch</li>
              <li>Erstellung und Verwaltung deines Nutzerkontos</li>
              <li>Betrieb der Plattform und Bereitstellung unserer Dienste</li>
              <li>Kommunikation bezüglich deines Kontos</li>
            </ul>
          </>
        ),
      },
      {
        heading: "§ 04 Rechtsgrundlage",
        body: (
          <>
            <p>
              Die Verarbeitung deiner Daten erfolgt auf Basis von Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)
              sowie Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).
            </p>
            <p className="mt-3">
              Mit der Eintragung in die Waitlist stimmst du der Verarbeitung deiner Daten für den oben
              genannten Zweck ausdrücklich zu.
            </p>
          </>
        ),
      },
      {
        heading: "§ 05 Speicherung und Sicherheit",
        body: (
          <>
            <p>
              Deine Daten werden auf Servern von Supabase (Supabase Inc., San Francisco, USA) gespeichert.
              Supabase ist nach dem EU-US Data Privacy Framework zertifiziert und bietet ein angemessenes
              Datenschutzniveau gemäß DSGVO.
            </p>
            <p className="mt-3">
              Deine Daten werden so lange gespeichert, wie dein Konto aktiv ist. Nach Löschung deines
              Kontos werden alle personenbezogenen Daten innerhalb von 30 Tagen gelöscht.
            </p>
            <p className="mt-3">
              Wir verkaufen deine Daten nie an Dritte. Wir geben deine Daten nicht an Werbetreibende
              weiter. Deine Daten werden ausschließlich für den Betrieb von Scorlink verwendet.
            </p>
          </>
        ),
      },
      {
        heading: "§ 06 Deine Rechte",
        body: (
          <>
            <p>Du hast jederzeit folgende Rechte:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li><strong>Auskunftsrecht</strong> — du kannst jederzeit Auskunft über deine gespeicherten Daten verlangen</li>
              <li><strong>Berichtigungsrecht</strong> — du kannst die Korrektur falscher Daten verlangen</li>
              <li><strong>Löschungsrecht</strong> — du kannst die Löschung deiner Daten verlangen</li>
              <li><strong>Widerspruchsrecht</strong> — du kannst der Verarbeitung deiner Daten widersprechen</li>
              <li><strong>Datenübertragbarkeit</strong> — du kannst deine Daten in einem gängigen Format erhalten</li>
              <li><strong>Widerruf</strong> — du kannst deine Einwilligung jederzeit widerrufen</li>
            </ul>
            <p className="mt-3">
              Zur Ausübung deiner Rechte wende dich an:{" "}
              <a href="mailto:omar@scorlink.com" className="underline">
                omar@scorlink.com
              </a>
            </p>
            <p className="mt-3">
              Du hast außerdem das Recht, dich bei der österreichischen Datenschutzbehörde zu beschweren:{" "}
              <a href="https://dsb.gv.at" target="_blank" rel="noreferrer" className="underline">
                dsb.gv.at
              </a>
            </p>
          </>
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
