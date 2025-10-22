// middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

const secret = process.env.NEXTAUTH_SECRET

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // 🔓 Rutas públicas que no requieren sesión
  if (
    pathname.startsWith("/api/auth") || // rutas de NextAuth
    pathname.startsWith("/auth/login") || // tu página de login
    pathname.startsWith("/auth/register") || // tu página de registro
    pathname === "/" // landing pública
  ) {
    return NextResponse.next()
  }

  // 🔒 Verificar sesión
  const token = await getToken({ req, secret })

  if (!token) {
    // Si no hay sesión, redirigir a login
    const url = req.nextUrl.clone()
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  // 🔐 Ejemplo: proteger solo admin
  if (pathname.startsWith("/admin") && token.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 })
  }

  return NextResponse.next()
}

// Aplica a todas las rutas excepto archivos estáticos y assets
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
// Esto incluye todas las rutas excepto las estáticas y assets