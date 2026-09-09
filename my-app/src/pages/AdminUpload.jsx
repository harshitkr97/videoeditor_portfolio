import { useEffect, useMemo, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Icon from '../components/Icon'
import { designer } from '../data/portfolio'
import { absoluteMediaUrl, listMedia, uploadMedia } from '../lib/mediaApi'

function formatBytes(bytes) {
  if (typeof bytes !== 'number' || Number.isNaN(bytes)) return ''
  const units = ['B', 'KB', 'MB', 'GB']
  let idx = 0
  let value = bytes
  while (value >= 1024 && idx < units.length - 1) {
    value /= 1024
    idx += 1
  }
  return `${value.toFixed(value >= 10 || idx === 0 ? 0 : 1)} ${units[idx]}`
}

export default function AdminUpload() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [items, setItems] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)
  const [title, setTitle] = useState('')
  const [client, setClient] = useState('')
  const [year, setYear] = useState(String(new Date().getFullYear()))
  const [tags, setTags] = useState('')
  const [description, setDescription] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  async function refresh() {
    const next = await listMedia()
    setItems(next)
  }

  useEffect(() => {
    refresh().catch((e) => setError(e?.message || 'Failed to load media'))
  }, [])

  const accept = useMemo(() => 'image/*,video/*', [])

  async function onUpload(e) {
    e.preventDefault()
    setError('')
    setNotice('')
    if (!selectedFile) {
      setError('Select an image or video first.')
      return
    }
    if (!title.trim()) {
      setError('Title is required.')
      return
    }

    try {
      setBusy(true)
      const created = await uploadMedia(selectedFile, {
        title: title.trim(),
        client: client.trim(),
        year: year.trim(),
        tags: tags.trim(),
        description: description.trim(),
      })
      setSelectedFile(null)
      setNotice(`Uploaded: ${created.originalName || created.id}`)
      await refresh()
    } catch (err) {
      setError(err?.message || 'Upload failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-[100svh] bg-[radial-gradient(circle_at_10%_10%,rgba(168,85,247,0.30),transparent_40%),radial-gradient(circle_at_90%_20%,rgba(34,211,238,0.25),transparent_40%),radial-gradient(circle_at_50%_90%,rgba(244,63,94,0.18),transparent_40%)]">
      <Header
        designer={designer}
        mobileNavOpen={mobileNavOpen}
        setMobileNavOpen={setMobileNavOpen}
      />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-white/60">
              Admin
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Upload media
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-white/70">
              Upload an image or video to your backend. It will appear in the
              portfolio on the home page.
            </p>
          </div>

          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/10"
          >
            <Icon name="arrow" className="h-4 w-4 rotate-180" />
            Back to portfolio
          </a>
        </div>

        <form
          onSubmit={onUpload}
          className="mt-8 grid gap-4 rounded-3xl border border-white/10 bg-black/20 p-5 sm:grid-cols-12 sm:items-end"
        >
          <div className="sm:col-span-7">
            <label className="text-sm font-medium text-white/80">
              Select file
              <input
                type="file"
                accept={accept}
                disabled={busy}
                onChange={(ev) => {
                  const file = ev.target.files?.[0] || null
                  setSelectedFile(file)
                  if (file && !title.trim()) {
                    const base = file.name.replace(/\.[^/.]+$/, '')
                    setTitle(base.slice(0, 90))
                  }
                }}
                className="mt-2 block w-full cursor-pointer rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 file:mr-4 file:rounded-xl file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-semibold file:text-black hover:border-white/20"
              />
            </label>
            {selectedFile ? (
              <p className="mt-2 text-xs text-white/60">
                {selectedFile.name} â€¢ {formatBytes(selectedFile.size)}
              </p>
            ) : null}
          </div>

          <div className="sm:col-span-5 sm:flex sm:justify-end">
            <button
              type="submit"
              disabled={busy}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {busy ? 'Uploadingâ€¦' : 'Upload'}
              <Icon name="upload" className="h-4 w-4" />
            </button>
          </div>

          {error ? (
            <div className="sm:col-span-12 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
              {error}
            </div>
          ) : null}
          {notice ? (
            <div className="sm:col-span-12 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
              {notice}
            </div>
          ) : null}
        </form>

        <section className="mt-4 grid gap-4 rounded-3xl border border-white/10 bg-black/10 p-5 sm:grid-cols-12">
          <div className="sm:col-span-6">
            <label className="text-sm font-medium text-white/80">
              Title <span className="text-white/50">(required)</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={busy}
                placeholder="e.g. Brand launch reel"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-cyan-300/50"
              />
            </label>
          </div>

          <div className="sm:col-span-6">
            <label className="text-sm font-medium text-white/80">
              Client
              <input
                value={client}
                onChange={(e) => setClient(e.target.value)}
                disabled={busy}
                placeholder="e.g. Lifestyle Brand"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-cyan-300/50"
              />
            </label>
          </div>

          <div className="sm:col-span-3">
            <label className="text-sm font-medium text-white/80">
              Year
              <input
                value={year}
                onChange={(e) => setYear(e.target.value)}
                disabled={busy}
                placeholder="2026"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-cyan-300/50"
              />
            </label>
          </div>

          <div className="sm:col-span-9">
            <label className="text-sm font-medium text-white/80">
              Tags <span className="text-white/50">(comma separated)</span>
              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                disabled={busy}
                placeholder="Reels, Editing, Color"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-cyan-300/50"
              />
            </label>
          </div>

          <div className="sm:col-span-12">
            <label className="text-sm font-medium text-white/80">
              Description
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={busy}
                rows={4}
                placeholder="Short overview shown in the modal."
                className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-cyan-300/50"
              />
            </label>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-white">
              Uploaded items
            </h2>
            <button
              type="button"
              onClick={() =>
                refresh().catch((e) => setError(e?.message || 'Refresh failed'))
              }
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/10"
            >
              Refresh <Icon name="refresh" className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => {
              const url = absoluteMediaUrl(item)
              const isImage = item.kind === 'image' || item.mimetype?.startsWith('image/')
              const isVideo = item.kind === 'video' || item.mimetype?.startsWith('video/')
              return (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                >
                  <div className="aspect-[16/10] w-full overflow-hidden bg-black/30">
                    {isImage ? (
                      <img
                        src={url}
                        alt=""
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : isVideo ? (
                      <video
                        src={url}
                        className="h-full w-full object-cover"
                        controls
                        preload="metadata"
                      />
                    ) : (
                      <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.45),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(34,211,238,0.35),transparent_38%),linear-gradient(120deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]" />
                    )}
                  </div>

                  <div className="space-y-2 p-4">
                    <p className="text-sm font-semibold text-white">
                      {item.title || item.originalName || item.id}
                    </p>
                    <p className="text-xs text-white/60">
                      {item.client ? `${item.client} â€¢ ` : ''}
                      {item.year ? `${item.year} â€¢ ` : ''}
                      {item.kind || 'file'} â€¢ {formatBytes(item.size)}
                    </p>
                    {Array.isArray(item.tags) && item.tags.length ? (
                      <p className="text-xs text-white/55">
                        {item.tags.slice(0, 6).join(', ')}
                      </p>
                    ) : null}
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-white/80 hover:text-white"
                    >
                      Open <Icon name="external" className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </main>

      <Footer designer={designer} />
    </div>
  )
}
