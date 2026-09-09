import { API_BASE_URL } from './config'

async function readJson(res) {
  const text = await res.text()
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

export async function listMedia() {
  const res = await fetch(`${API_BASE_URL}/api/media`)
  const data = await readJson(res)
  if (!res.ok) throw new Error(data?.error || 'Failed to load media')
  return data?.items || []
}

export async function uploadMedia(file, meta = {}) {
  const body = new FormData()
  body.append('file', file)
  if (meta?.title) body.append('title', meta.title)
  if (meta?.client) body.append('client', meta.client)
  if (meta?.year) body.append('year', meta.year)
  if (meta?.tags) body.append('tags', meta.tags)
  if (meta?.description) body.append('description', meta.description)

  const res = await fetch(`${API_BASE_URL}/api/media`, {
    method: 'POST',
    body,
  })
  const data = await readJson(res)
  if (!res.ok) throw new Error(data?.error || 'Upload failed')
  return data
}

export function absoluteMediaUrl(itemOrUrl) {
  const url = typeof itemOrUrl === 'string' ? itemOrUrl : itemOrUrl?.url
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return `${API_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`
}
