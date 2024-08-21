import mongoose from 'mongoose'

export default function connectMongoDB() {
  try {
    mongoose.connect(process.env.MONGODB_URI || '')
  } catch (e) {
    console.error(e)
  }
}
