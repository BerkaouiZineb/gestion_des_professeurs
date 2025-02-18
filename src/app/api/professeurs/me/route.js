import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import "dotenv/config"; // Charger les variables d'environnement

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    // Vérification du token dans les headers
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Token manquant ou invalide" }), { status: 401 });
    }

    // Extraction et décodage du token
    const token = authHeader.split(" ")[1];
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      console.error("ERREUR: JWT_SECRET non défini !");
      return new Response(JSON.stringify({ error: "Erreur serveur" }), { status: 500 });
    }

    const decoded = jwt.verify(token, secretKey);
    const idProfesseur = decoded.id; // ✅ Récupération dynamique de l'ID utilisateur

    // Récupérer les informations du professeur
    const professeur = await prisma.professeur.findUnique({
      where: { id: idProfesseur },
      select: { id: true, nom: true, prenom: true, email: true, telephone: true, matieres: true, statut: true, photo: true },
    });

    if (!professeur) {
      return new Response(JSON.stringify({ error: "Professeur non trouvé" }), { status: 404 });
    }

    return new Response(JSON.stringify(professeur), { status: 200 });
  } catch (error) {
    console.error("Erreur serveur :", error);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), { status: 500 });
  }
}
