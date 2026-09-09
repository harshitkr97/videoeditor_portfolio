import { MONGODB_URI } from '../config/mongo.js'
import { readManifest, writeManifest } from './manifest.js'
import {
  getMediaByIdMongo,
  insertMediaMongo,
  listMediaMongo,
} from './mediaMongoStore.js'

export async function listMedia() {
  if (MONGODB_URI) return listMediaMongo()
  return readManifest()
}

export async function getMediaById(id) {
  if (MONGODB_URI) return getMediaByIdMongo(id)
  const items = await readManifest()
  return items.find((i) => i.id === id) || null
}

export async function insertMedia(item) {
  if (MONGODB_URI) return insertMediaMongo(item)
  const items = await readManifest()
  items.unshift(item)
  await writeManifest(items)
  return item
}

