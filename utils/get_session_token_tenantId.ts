// lib/session.ts
import { getServerSession } from "next-auth/next"
import { authOptions } from "../lib/auth"

export async function getSessionTokenAndTenantId() {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error("No autorizado")
  }

  const tenantId = (session.user as any)?.tenantId
  if (!tenantId) {
    throw new Error("Tenant no encontrado en sesión")
  }

  return { session, tenantId }
}
