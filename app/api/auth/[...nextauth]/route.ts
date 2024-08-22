import User from '@/models/user'
import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import connectMongoDB from '@/lib/mongodb'
import { checkMatchPassword } from '@/lib/utils'

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

          const passwordMatch = checkMatchPassword(user.password, password)

          if (!passwordMatch) {
            return null
          }

          return {
            ...user,
            name: user.name,
            email: user.username,
          }
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
