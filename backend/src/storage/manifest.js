import fs from 'node:fs/promises'
import path from 'node:path'
import { manifestFile } from '../config/paths.js'

export async function readManifest() {
  try {
    const raw = await fs.readFile(manifestFile, 'utf8')
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (e) {
    if (e && (e.code === 'ENOENT' || e.code === 'ENOTDIR')) return []
    throw e
  }
}

export async function writeManifest(items) {
  const file = manifestFile
  const dir = path.dirname(file)
  await fs.mkdir(dir, { recursive: true })

  const tmp = `${file}.tmp`
  await fs.writeFile(tmp, JSON.stringify(items, null, 2), 'utf8')
  await fs.rename(tmp, file)
}
