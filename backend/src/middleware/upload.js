import path from 'node:path'
import crypto from 'node:crypto'
import multer from 'multer'
import { uploadsImagesDir, uploadsVideosDir } from '../config/paths.js'

function safeExt(originalname) {
  const ext = path.extname(originalname || '').slice(0, 16)
  if (!ext) return ''
  return ext.replace(/[^a-zA-Z0-9.]/g, '')
}

function inferKind(mimetype) {
  if (typeof mimetype !== 'string') return null
  if (mimetype.startsWith('image/')) return 'images'
  if (mimetype.startsWith('video/')) return 'videos'
  return null
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const kind = inferKind(file.mimetype)
    if (!kind) return cb(new Error('Only image/* and video/* uploads are allowed.'))
    cb(null, kind === 'images' ? uploadsImagesDir : uploadsVideosDir)
  },
  filename: (req, file, cb) => {
    const id = crypto.randomUUID()
    const ext = safeExt(file.originalname)
    cb(null, `${id}${ext}`)
  },
})

export const uploadSingle = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
}).single('file')
