import { prisma } from "../../../lib/prisma";
import { cache } from "react";

export const getPets = cache(async (tenantId: string) => {
  return prisma.pet.findMany({
    where: { tenantId },
    select: { id: true, name: true },
  });
});
