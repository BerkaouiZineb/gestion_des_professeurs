import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import "dotenv/config"; // Charger les variables d'environnement

const prisma = new PrismaClient();

export async function PUT(req) {
  try {
    // Vérification du token
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Token manquant ou invalide" }, { status: 401 });
    }

    // Décodage du token
    const token = authHeader.split(" ")[1];
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      console.error("ERREUR: JWT_SECRET non défini !");
      return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }

    const decoded = jwt.verify(token, secretKey);
    const idProfesseur = decoded.id; // ✅ Récupération dynamique de l'ID

    // Récupération des nouvelles données du formulaire
    const { nom, prenom, email, telephone, matieres, statut } = await req.json();

    // Mise à jour dans la base de données
    const updatedProfesseur = await prisma.professeur.update({
      where: { id: idProfesseur },
      data: { nom, prenom, email, telephone, matieres, statut },
    });

    return NextResponse.json({ message: "Mise à jour réussie", professeur: updatedProfesseur }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
