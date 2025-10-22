// app/api/register/route.ts
import { prisma } from "../../../../lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password, name, tenantName} =
    await req.json();

  const hashed = await bcrypt.hash(password, 10);

  const tenant = await prisma.tenant.create({
    data: {
      name: tenantName || `${name}'s owner`,
    },
  });

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashed,
      tenantId: tenant.id,
      role: "admin"
    },
  });

  return NextResponse.json({ user });
}
