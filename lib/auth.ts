import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import type { NextAuthOptions } from "next-auth"
import { prisma } from "./prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages:{
    signOut: '/',
    signIn: '/auth/login'
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { tenant: true }
        })

        if (!user) return null

        const isValid = await bcrypt.compare(credentials.password, user.password)
        if (!isValid) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name ?? undefined,
          tenantId: user.tenantId, // clave para el multi-tenant
          role: user.role,
        }
      }
    })
  ],
callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.tenantId = (user as any).tenantId
      token.role = (user as any).role
    }
    return token
  },
  async session({ session, token }) {
    session.user.tenantId = token.tenantId as string
    session.user.role = token.role as string
    return session
  }
}

}
