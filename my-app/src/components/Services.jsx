import Icon from './Icon'

export default function Services() {
  return (
    <section id="services" className="py-14">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <p className="text-xs font-medium uppercase tracking-wide text-white/60">
              Services
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Everything you need for consistent content
            </h2>
            <p className="mt-3 text-sm text-white/70">
              Pick one deliverable or build a complete package. Clear timeline,
              clean files, and a polished final look.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  title: 'Reels / Shorts Editing',
                  desc: 'Captions, sound design, fast pacing, hooks, and brand-aligned color.',
                  icon: 'play',
                },
                {
                  title: 'Thumbnails & Posters',
                  desc: 'High-contrast layouts that convert: YouTube, ads, banners, promos.',
                  icon: 'image',
                },
                {
                  title: 'Product Creatives',
                  desc: 'Marketplace-ready designs with clean retouch and consistent style.',
                  icon: 'image',
                },
                {
                  title: 'Brand Templates',
                  desc: 'Carousels, story frames, and reusable systems for your team.',
                  icon: 'spark',
                },
              ].map((s) => (
                <div
                  key={s.title}
                  className="rounded-2xl border border-white/10 bg-black/20 p-5"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-cyan-300">
                    <Icon name={s.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-white">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/70">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

