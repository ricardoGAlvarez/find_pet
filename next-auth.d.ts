import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      accessToken: string
      id: string
      email: string
      name?: string
      tenantId: string
      role: string
    }
  }

  interface User {
    id: string
    email: string
    name?: string
    tenantId: string
    role: string
  }

  interface JWT {
    tenantId: string
    role: string
  }
}
