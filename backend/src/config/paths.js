import path from 'node:path'
import { fileURLToPath } from 'node:url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const appRoot = path.resolve(dirname, '..', '..')
export const uploadsDir = path.join(appRoot, 'uploads')
export const uploadsImagesDir = path.join(uploadsDir, 'images')
export const uploadsVideosDir = path.join(uploadsDir, 'videos')
export const manifestFile = path.join(uploadsDir, 'manifest.json')

