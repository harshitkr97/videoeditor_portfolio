import Badge from './Badge'
import Icon from './Icon'
import Modal from './Modal'

export default function ProjectModal({ designer, project, onClose }) {
  return (
    <Modal open={Boolean(project)} title={project?.title || 'Project'} onClose={onClose}>
      {project ? (
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
              {project.type === 'video' && project.embedUrl ? (
                <div className="aspect-video w-full">
                  <iframe
                    className="h-full w-full"
                    src={project.embedUrl}
                    title={project.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ) : project.type === 'video' && project.videoUrl ? (
                <div className="aspect-video w-full">
                  <video
                    className="h-full w-full"
                    src={project.videoUrl}
                    controls
                    preload="metadata"
                  />
                </div>
              ) : project.type === 'image' && project.imageUrl ? (
                <img
                  src={project.imageUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="aspect-video w-full bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.45),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(34,211,238,0.35),transparent_38%),linear-gradient(120deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]" />
              )}
            </div>
          </div>

          <div className="space-y-4 lg:col-span-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-white/60">
                Client
              </p>
              <p className="mt-1 text-sm text-white/80">
                {project.client} • {project.year}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-white/60">
                Overview
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-sm font-semibold text-white">
                Want something like this?
              </p>
              <p className="mt-2 text-sm text-white/70">
                Send your reference + deadline and I’ll propose a package.
              </p>
              <a
                href={`mailto:${designer.email}?subject=${encodeURIComponent(
                  `Project inquiry — ${project.title}`,
                )}`}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                Email {designer.name}
                <Icon name="mail" className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </Modal>
  )
}
