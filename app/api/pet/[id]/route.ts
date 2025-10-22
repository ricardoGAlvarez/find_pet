import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

interface Params {
  id: string;
}
export async function GET(request: NextRequest, context: { params: Promise<Params> }) {
  try {
    const { id } = await context.params; // 👈 importante
    const pet = await prisma.pet.findUnique({
      where: { id },
      include: { owner: true,
      foundPets: true,
      medicalRecords: true
       },
    });
    return NextResponse.json(pet);
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
export async function DELETE(request: NextRequest, context: { params: Promise<Params> }) {
  try {
    const { id } = await context.params;
    await prisma.pet.delete({ where: { id } });
    return NextResponse.json({ message: "Pet deleted successfully" });
  } catch (error) {
    console.error("Error in DELETE handler:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, context: { params: Promise<Params> }) {
  try {
    const { id } = await context.params;
    const data = await request.json();
    const updatedPet = await prisma.pet.update({
      where: { id },
      data,
    });
    return NextResponse.json(updatedPet);
  } catch (error) {
    console.error("Error in PATCH handler:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
