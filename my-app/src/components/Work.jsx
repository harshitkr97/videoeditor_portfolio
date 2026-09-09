import ProjectCard from './ProjectCard'
import { classNames } from '../lib/classNames'

const filters = [
  ['all', 'All'],
  ['video', 'Video'],
  ['image', 'Images'],
]

export default function Work({
  projects,
  activeFilter,
  setActiveFilter,
  onOpenProject,
}) {
  return (
    <section id="work" className="py-14">
      <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-white/60">
            Portfolio
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Selected work
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-white/70">
            A quick preview. Swap the project links and images with your real
            work when you’re ready.
          </p>
        </div>

        <div className="inline-flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2">
          {filters.map(([key, label]) => {
            const active = activeFilter === key
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveFilter(key)}
                className={classNames(
                  'rounded-xl px-3 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300',
                  active
                    ? 'bg-white text-black'
                    : 'text-white/75 hover:bg-white/10 hover:text-white',
                )}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>

      <div
        aria-label="Selected work"
        className="work-gallery mt-8 grid max-h-[80rem] auto-rows-[26rem] gap-4 overflow-y-auto sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} onOpen={onOpenProject} />
        ))}
      </div>
    </section>
  )
}
