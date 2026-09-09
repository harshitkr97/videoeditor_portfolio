import Icon from './Icon'

export default function Hero({ designer, stats }) {
  return (
    <section className="grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
          <Icon name="spark" className="h-4 w-4 text-cyan-300" />
          Available for freelance projects • {designer.location}
        </div>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Clean, modern design for brands that want to look premium.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">
          I design scroll-stopping visuals and high-retention edits: reels,
          product ads, posters, YouTube packages, and social templates.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="#work"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
          >
            View work
            <Icon name="arrow" className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${designer.email}?subject=Project%20Inquiry`}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
          >
            Get a quote
            <Icon name="mail" className="h-4 w-4" />
          </a>
          <div className="text-sm text-white/60">Typical reply within 24 hours</div>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-3 sm:max-w-md">
          {[
            [stats.total, 'Projects'],
            [stats.video, 'Videos'],
            [stats.image, 'Designs'],
          ].map(([value, label]) => (
            <div
              key={label}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <div className="text-xl font-semibold text-white">{value}</div>
              <div className="mt-1 text-xs text-white/60">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(168,85,247,0.35),transparent_40%),radial-gradient(circle_at_75%_70%,rgba(34,211,238,0.25),transparent_40%)]" />
          <div className="relative space-y-4">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-white/60">
                What I deliver
              </p>
              <ul className="mt-3 space-y-2 text-sm text-white/75">
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  Reel / Short edit with captions + sound design
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-fuchsia-300" />
                  Posters, thumbnails, product creatives, carousels
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-rose-300" />
                  Brand kit: colors, typography, reusable templates
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                ['Fast delivery', '2–4 days average'],
                ['Clean files', 'Organized layers'],
                ['Revisions', '2 rounds included'],
                ['Formats', 'IG / YT / Web'],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4"
                >
                  <div className="text-sm font-semibold text-white">{k}</div>
                  <div className="mt-1 text-xs text-white/60">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

