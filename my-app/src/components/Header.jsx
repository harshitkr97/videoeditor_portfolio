import Icon from './Icon'
import { classNames } from '../lib/classNames'

const navLinks = [
  ['Work', '#work'],
  ['Services', '#services'],
  ['About', '#about'],
  ['Contact', '#contact'],
]

export default function Header({ designer, mobileNavOpen, setMobileNavOpen }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/30 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-semibold text-white">
            M
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold text-white">
              {designer.name} Studio
            </span>
            <span className="block text-xs text-white/60">{designer.role}</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 text-sm text-white/80 md:flex">
          {navLinks.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="rounded-xl px-3 py-2 transition hover:bg-white/5 hover:text-white"
            >
              {label}
            </a>
          ))}
          <a
            href={`mailto:${designer.email}`}
            className="ml-2 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 font-medium text-white transition hover:bg-white/10"
          >
            <Icon name="mail" className="h-4 w-4" />
            Hire me
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 text-white/90 transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 md:hidden"
          onClick={() => setMobileNavOpen((v) => !v)}
          aria-expanded={mobileNavOpen}
          aria-controls="mobile-nav"
        >
          <span className="sr-only">Toggle menu</span>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
            <path
              d="M5 7h14M5 12h14M5 17h14"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div
        id="mobile-nav"
        className={classNames('md:hidden', mobileNavOpen ? 'block' : 'hidden')}
      >
        <div className="mx-auto max-w-6xl px-4 pb-4 sm:px-6 lg:px-8">
          <div className="space-y-1 rounded-2xl border border-white/10 bg-black/30 p-2">
            {navLinks.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="block rounded-xl px-3 py-2 text-sm text-white/85 transition hover:bg-white/5"
                onClick={() => setMobileNavOpen(false)}
              >
                {label}
              </a>
            ))}
            <a
              href={`mailto:${designer.email}`}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/10"
              onClick={() => setMobileNavOpen(false)}
            >
              <Icon name="mail" className="h-4 w-4" />
              Hire me
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

