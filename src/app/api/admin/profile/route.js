import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import "dotenv/config"; // Charger les variables d'environnement

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    // Récupérer le token depuis l'en-tête Authorization
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Token manquant ou invalide" }), { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const secretKey = process.env.JWT_SECRET;

    if (!secretKey) {
      console.error("ERREUR: JWT_SECRET non défini !");
      return new Response(JSON.stringify({ error: "Erreur serveur" }), { status: 500 });
    }

    // Vérifier et décoder le token
    const decoded = jwt.verify(token, secretKey);

    // Récupérer les informations de l'admin
    const admin = await prisma.admin.findUnique({
      where: { id: decoded.id },
      select: { id: true, nom: true, prenom: true, email: true, telephone: true } // Sélectionnez les champs nécessaires
    });

    if (!admin) {
      return new Response(JSON.stringify({ error: "Admin non trouvé" }), { status: 404 });
    }

    return new Response(JSON.stringify(admin), { status: 200 });
  } catch (error) {
    console.error("Erreur serveur :", error);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), { status: 500 });
  }
}