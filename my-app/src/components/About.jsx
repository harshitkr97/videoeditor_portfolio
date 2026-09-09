export default function About() {
  return (
    <section id="about" className="py-14">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-5">
          <p className="text-xs font-medium uppercase tracking-wide text-white/60">
            About
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Design that feels simple, intentional, and premium
          </h2>
          <p className="mt-3 text-sm text-white/70">
            I focus on clarity and consistency: strong typography, balanced
            spacing, clean color, and edits that keep viewers watching.
          </p>

          <div className="mt-6 space-y-3">
            {[
              ['Workflow', 'Brief → Draft → Revisions → Delivery'],
              ['Tools', 'Premiere Pro, After Effects, Photoshop'],
              ['Deliverables', 'Optimized exports + editable source files'],
            ].map(([k, v]) => (
              <div
                key={k}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div className="text-sm font-semibold text-white">{k}</div>
                <div className="mt-1 text-sm text-white/70">{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                title: 'Quality first',
                desc: 'Every frame is intentional: composition, color, and hierarchy.',
              },
              {
                title: 'On-brand always',
                desc: 'Templates + systems so your content looks consistent every time.',
              },
              {
                title: 'Mobile-ready',
                desc: 'Designed for the feed: safe areas, readable type, strong contrast.',
              },
              {
                title: 'Clean handoff',
                desc: 'Organized files so you can reuse and scale content later.',
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-white/10 bg-black/20 p-5"
              >
                <h3 className="text-base font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm text-white/70">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

