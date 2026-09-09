import { v2 as cloudinary } from 'cloudinary'

const cloudName = process.env.CLOUDINARY_CLOUD_NAME || ''
const apiKey = process.env.CLOUDINARY_API_KEY || ''
const apiSecret = process.env.CLOUDINARY_API_SECRET || ''

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
})

function configurationError() {
  const error = new Error('Cloudinary upload storage has not been configured.')
  error.statusCode = 503
  return error
}

export async function uploadMediaToCloudinary(file) {
  if (!cloudName || !apiKey || !apiSecret) throw configurationError()

  const resourceType = file.mimetype?.startsWith('video/') ? 'video' : 'image'
  return cloudinary.uploader.upload(file.path, {
    folder: 'mausam-portfolio',
    resource_type: resourceType,
  })
}
