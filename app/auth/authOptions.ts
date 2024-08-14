import prisma from '@/prisma/client'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import { NextAuthOptions } from 'next-auth'

const authOptions: NextAuthOptions = {
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {

      return true;
    },
    async redirect({ url, baseUrl }) {

      return '/dashboard'; 
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  
}

export default authOptions
