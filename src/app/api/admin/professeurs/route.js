import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const professeurs = await prisma.professeur.findMany({
      select: {
        id: true,
        nom: true,
        prenom: true,
        email: true,
        telephone: true,
        matieres: true,
        photo: true,
      },
    });

    return new Response(JSON.stringify(professeurs), { status: 200 });
  } catch (error) {
    console.error("Erreur serveur :", error);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), { status: 500 });
  }
}