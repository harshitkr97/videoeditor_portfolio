import Badge from './Badge'
import Icon from './Icon'
import { useState } from 'react'

function VideoThumbnail({ src }) {
  const [hasFrame, setHasFrame] = useState(false)

  function showFirstFrame(event) {
    const video = event.currentTarget
    // Browsers normally show a blank video surface until a frame is decoded.
    // Seek a tiny amount into the file so the card has a reliable preview frame.
    if (video.duration && Number.isFinite(video.duration)) {
      video.currentTime = Math.min(0.1, video.duration)
    }
  }

  return (
    <video
      src={src}
      aria-hidden="true"
      muted
      playsInline
      preload="auto"
      onLoadedMetadata={showFirstFrame}
      onLoadedData={() => setHasFrame(true)}
      onSeeked={() => setHasFrame(true)}
      className={`pointer-events-none h-full w-full object-cover transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100 ${
        hasFrame ? 'opacity-90' : 'opacity-0'
      }`}
    />
  )
}

export default function ProjectCard({ project, onOpen }) {
  const typeLabel = project.type === 'video' ? 'Video' : 'Image'
  const typeIcon = project.type === 'video' ? 'play' : 'image'

  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      className="group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset] transition hover:border-white/20 hover:bg-white/10"
    >
      <div className="relative">
        <div className="aspect-[16/10] w-full overflow-hidden">
          {project.type === 'image' && project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt=""
              className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
              loading="lazy"
              decoding="async"
            />
          ) : project.type === 'video' && project.videoUrl ? (
            <VideoThumbnail src={project.videoUrl} />
          ) : (
            <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.45),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(34,211,238,0.35),transparent_38%),linear-gradient(120deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]" />
          )}
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/80 backdrop-blur">
          <Icon name={typeIcon} className="h-4 w-4" />
          <span>
            {typeLabel} • {project.year}
          </span>
        </div>
      </div>

      <div className="space-y-3 p-5">
        <div>
          <h3 className="text-base font-semibold tracking-tight text-white">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-white/70">{project.client}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        <div className="flex items-center justify-between pt-1 text-sm text-white/80">
          <span className="inline-flex items-center gap-2">
            View project <Icon name="arrow" className="h-4 w-4" />
          </span>
          <span className="text-white/55">Click to preview</span>
        </div>
      </div>
    </button>
  )
}
