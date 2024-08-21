import { NextRequest, NextResponse } from 'next/server'
import Crypto from 'crypto-js'
import connectMongoDB from '@/lib/mongodb'
import User from '@/models/user'

export async function POST(req: NextRequest) {
  try {
    const { name, username, password } = await req.json()

    await connectMongoDB()

    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return NextResponse.json(
        { message: 'Email or phone number is already in use' },
        { status: 400 }
      )
    }

    const secretKey = process.env.SECRET_KEY || ''
    const encryptedPassword = Crypto.AES.encrypt(password, secretKey).toString()

    await User.create({ name, username, password: encryptedPassword })
    return NextResponse.json(
      { message: 'User registered successfully' },
      { status: 201 }
    )
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 500 })
  }
}
