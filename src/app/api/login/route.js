import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config"; // Charge les variables d'environnement

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const user = await prisma.professeur.findUnique({ where: { email } });
    if (!user) {
      return new Response(JSON.stringify({ error: "Utilisateur introuvable" }), { status: 400 });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return new Response(JSON.stringify({ error: "Mot de passe incorrect" }), { status: 400 });
    }

    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      console.error("ERREUR: JWT_SECRET non défini !");
      return new Response(JSON.stringify({ error: "Erreur serveur" }), { status: 500 });
    }

    // ✅ Générer un token JWT sécurisé
    const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: "1h" });

    return new Response(JSON.stringify({ token, user }), { status: 200 });
  } catch (error) {
    console.error("Erreur de connexion:", error);
    return new Response(JSON.stringify({ error: "Erreur de connexion" }), { status: 500 });
  }
}
