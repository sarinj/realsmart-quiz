import User from '@/models/user'
import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import Crypto from 'crypto-js'
import connectMongoDB from '@/lib/mongodb'

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      async authorize(credentials: any) {
        const { username, password } = credentials

        try {
          await connectMongoDB()
          const user = await User.findOne({ username })

          if (!user) {
            return null
          }

          const passwordMatch =
            Crypto.AES.decrypt(
              user.password,
              process.env.SECRET_KEY || ''
            ).toString(Crypto.enc.Utf8) === password

          if (!passwordMatch) {
            return null
          }

          return user
        } catch (e) {
          console.log(e)
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
