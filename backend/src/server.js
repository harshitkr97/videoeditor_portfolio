import 'dotenv/config'
import fs from 'node:fs/promises'
import path from 'node:path'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import nodemailer from 'nodemailer'
import { uploadSingle } from './middleware/upload.js'
import { getMediaById, insertMedia, listMedia } from './storage/mediaStore.js'
import { uploadsDir, uploadsImagesDir, uploadsVideosDir } from './config/paths.js'

const app = express()

const PORT = Number(process.env.PORT || 5050)
const CORS_ORIGINS = String(process.env.CORS_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true)
      if (CORS_ORIGINS.includes(origin)) return cb(null, true)
      return cb(new Error('CORS blocked for this origin.'))
    },
    credentials: true,
  }),
)
app.use(morgan('dev'))
app.use(express.json({ limit: '2mb' }))

// Serve uploaded files
app.use('/uploads', express.static(uploadsDir))

app.get('/health', (req, res) => {
  res.json({ ok: true })
})

const CONTACT_RECIPIENT = process.env.CONTACT_RECIPIENT || 'mishraharshit410@gmail.com'
const GMAIL_USER = process.env.GMAIL_USER || ''
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD || ''

function cleanContactValue(value, maxLength) {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, maxLength)
}

app.post('/api/contact', async (req, res, next) => {
  const name = cleanContactValue(req.body?.name, 100)
  const email = cleanContactValue(req.body?.email, 254)
  const details = cleanContactValue(req.body?.details, 5000)

  if (!name || !email || !details) {
    return res.status(400).json({ error: 'Name, email, and project details are required.' })
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: 'Enter a valid email address.' })
  }
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    return res.status(503).json({ error: 'Email delivery has not been configured yet.' })
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
    })
    await transporter.sendMail({
      from: `Portfolio contact form <${GMAIL_USER}>`,
      to: CONTACT_RECIPIENT,
      replyTo: email,
      subject: `Portfolio inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nProject details:\n${details}\n`,
    })
    res.status(202).json({ ok: true })
  } catch (error) {
    next(error)
  }
})

app.get('/api/media', async (req, res, next) => {
  try {
    const items = await listMedia()
    res.json({ items })
  } catch (e) {
    next(e)
  }
})

app.get('/api/media/:id', async (req, res, next) => {
  try {
    const found = await getMediaById(req.params.id)
    if (!found) return res.status(404).json({ error: 'Not found' })
    res.json(found)
  } catch (e) {
    next(e)
  }
})

app.post('/api/media', (req, res, next) => {
  uploadSingle(req, res, async (err) => {
    if (err) return next(err)
    if (!req.file) return res.status(400).json({ error: 'Missing file' })

    try {
      const cleanString = (value, maxLen) => {
        if (typeof value !== 'string') return ''
        return value.trim().slice(0, maxLen)
      }

      const parseTags = (raw) => {
        if (typeof raw !== 'string') return []
        const values = raw
          .split(/[,\n]/g)
          .map((t) => t.trim())
          .filter(Boolean)
          .slice(0, 16)
          .map((t) => t.slice(0, 24))
        return Array.from(new Set(values))
      }

      const kind = req.file.mimetype?.startsWith('image/')
        ? 'image'
        : req.file.mimetype?.startsWith('video/')
          ? 'video'
          : 'unknown'

      const rel = path
        .relative(uploadsDir, req.file.path)
        .replaceAll('\\', '/')

      const id = path.parse(req.file.filename).name
      const title = cleanString(req.body?.title, 90)
      const client = cleanString(req.body?.client, 70)
      const year = cleanString(req.body?.year, 10)
      const tags = parseTags(req.body?.tags)
      const description = cleanString(req.body?.description, 800)
      const item = {
        id,
        kind,
        mimetype: req.file.mimetype,
        originalName: req.file.originalname,
        size: req.file.size,
        url: `/uploads/${rel}`,
        title,
        client,
        year,
        tags,
        description,
        createdAt: new Date().toISOString(),
      }

      await insertMedia(item)

      res.status(201).json(item)
    } catch (e) {
      next(e)
    }
  })
})

app.use((err, req, res, next) => {
  const status = err?.statusCode || err?.status || 500
  const message =
    status >= 500 ? 'Internal Server Error' : (err?.message || 'Bad Request')
  res.status(status).json({ error: message })
})

async function ensureUploadDirs() {
  await fs.mkdir(uploadsImagesDir, { recursive: true })
  await fs.mkdir(uploadsVideosDir, { recursive: true })
}

await ensureUploadDirs()

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${PORT}`)
})
