const cards = [
  { title: "Recent Documents", value: "18", hint: "2 uploaded today" },
  { title: "Expiry Alerts", value: "3", hint: "Passport in 65 days" },
  { title: "Verification Score", value: "98%", hint: "Blockchain anchored" }
];

export function Dashboard() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl p-6">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Digilock Command Center</h1>
          <p className="text-slate-400">AI-secured document vault, search and verification</p>
        </div>
        <button className="rounded-xl bg-neon px-4 py-2 font-medium text-white hover:bg-violet-500">
          Quick Upload
        </button>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <article key={card.title} className="card">
            <h2 className="text-sm uppercase tracking-wide text-cyan-300">{card.title}</h2>
            <p className="mt-2 text-3xl font-semibold">{card.value}</p>
            <p className="mt-1 text-sm text-slate-400">{card.hint}</p>
          </article>
        ))}
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <article className="card">
          <h3 className="text-lg font-semibold">Smart Search</h3>
          <p className="mt-1 text-sm text-slate-400">Try: “show my passport” or “education certificates”</p>
          <input
            className="mt-3 w-full rounded-xl border border-slate-700 bg-slate-800 p-3"
            placeholder="Search by text, tag, event timeline..."
          />
        </article>

        <article className="card">
          <h3 className="text-lg font-semibold">Life Timeline</h3>
          <ul className="mt-2 space-y-2 text-sm text-slate-300">
            <li>🎓 Education: degree certificates auto-clustered</li>
            <li>✈️ Travel: passport + visa reminders</li>
            <li>💼 Career: contracts and offer letters</li>
          </ul>
        </article>
      </section>
    </main>
  );
}
