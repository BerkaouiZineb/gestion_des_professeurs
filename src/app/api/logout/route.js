import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ message: "Déconnexion réussie" }, { status: 200 });
}
