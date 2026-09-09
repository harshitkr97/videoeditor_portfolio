import { MongoClient, ServerApiVersion } from 'mongodb'
import { MONGODB_URI } from '../config/mongo.js'

let cached = globalThis.__mausamMongoClient
if (!cached) {
  cached = { client: null, promise: null }
  globalThis.__mausamMongoClient = cached
}

export async function getMongoClient() {
  if (!MONGODB_URI) {
    throw new Error('Missing MONGODB_URI')
  }
  if (cached.client) return cached.client
  if (!cached.promise) {
    const client = new MongoClient(MONGODB_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    })
    cached.promise = client.connect().then(() => {
      cached.client = client
      return client
    })
  }
  return cached.promise
}

