import { MONGODB_DB, MONGODB_MEDIA_COLLECTION } from '../config/mongo.js'
import { getMongoClient } from './mongoClient.js'

let cachedColPromise = null
async function collection() {
  if (!cachedColPromise) {
    cachedColPromise = (async () => {
      const client = await getMongoClient()
      const db = client.db(MONGODB_DB)
      const col = db.collection(MONGODB_MEDIA_COLLECTION)
      await col.createIndex({ id: 1 }, { unique: true })
      await col.createIndex({ createdAt: -1 })
      return col
    })()
  }
  return cachedColPromise
}

function stripMongo(doc) {
  if (!doc) return null
  // eslint-disable-next-line no-unused-vars
  const { _id, ...rest } = doc
  return rest
}

export async function listMediaMongo({ limit = 200 } = {}) {
  const col = await collection()
  const docs = await col
    .find({})
    .sort({ createdAt: -1 })
    .limit(Math.max(1, Math.min(500, limit)))
    .toArray()
  return docs.map(stripMongo)
}

export async function getMediaByIdMongo(id) {
  const col = await collection()
  const doc = await col.findOne({ id })
  return stripMongo(doc)
}

export async function insertMediaMongo(item) {
  const col = await collection()
  await col.insertOne(item)
  return item
}
