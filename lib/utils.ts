import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import Crypto from 'crypto-js'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function checkMatchPassword(
  encryptedPassword: string,
  password: string
) {
  return (
    Crypto.AES.decrypt(
      encryptedPassword,
      process.env.SECRET_KEY || ''
    ).toString(Crypto.enc.Utf8) === password
  )
}
