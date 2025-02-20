import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config"; // Charge les variables d'environnement

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Vérifier si l'admin existe
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return new Response(JSON.stringify({ error: "Admin introuvable" }), { status: 400 });
    }

    // Vérifier le mot de passe
    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return new Response(JSON.stringify({ error: "Mot de passe incorrect" }), { status: 400 });
    }

    // Vérifier la clé secrète JWT
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      console.error("ERREUR: JWT_SECRET non défini !");
      return new Response(JSON.stringify({ error: "Erreur serveur" }), { status: 500 });
    }

    // Générer un token JWT sécurisé
    const token = jwt.sign({ id: admin.id, email: admin.email }, secretKey, { expiresIn: "1h" });

    // Retourner le token et les informations de l'admin (sans le mot de passe)
    const { password: _, ...adminWithoutPassword } = admin;
    return new Response(JSON.stringify({ token, admin: adminWithoutPassword }), { status: 200 });
  } catch (error) {
    console.error("Erreur de connexion admin:", error);
    return new Response(JSON.stringify({ error: "Erreur de connexion" }), { status: 500 });
  }
}