import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    // Vérifier si le professeur existe
    const professeur = await prisma.professeur.findUnique({ where: { id: parseInt(id) } });
    if (!professeur) {
      return new Response(JSON.stringify({ error: "Professeur introuvable" }), { status: 404 });
    }

    // Supprimer le professeur
    await prisma.professeur.delete({ where: { id: parseInt(id) } });

    return new Response(JSON.stringify({ message: "Professeur supprimé avec succès" }), { status: 200 });
  } catch (error) {
    console.error("Erreur serveur :", error);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), { status: 500 });
  }
}