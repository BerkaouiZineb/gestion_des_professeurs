import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const formData = await req.formData(); // Récupérer FormData
    const nom = formData.get("nom");
    const prenom = formData.get("prenom");
    const email = formData.get("email");
    const telephone = formData.get("telephone");
    const matieres = formData.get("matieres");
    const statut = formData.get("statut");
    const password = formData.get("password");
    const photo = formData.get("photo"); // Fichier image

    if (!nom || !prenom || !email || !telephone || !matieres || !statut || !password) {
      return new Response(JSON.stringify({ error: "Tous les champs sont obligatoires." }), { status: 400 });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    let photoUrl = null;
    if (photo) {
      const fileExt = photo.name.split(".").pop();
      const fileName = `${randomUUID()}.${fileExt}`;
      const filePath = path.join(process.cwd(), "public/uploads", fileName);
      
      // Sauvegarder le fichier sur le serveur
      const buffer = Buffer.from(await photo.arrayBuffer());
      await writeFile(filePath, buffer);

      photoUrl = `/uploads/${fileName}`; // URL de la photo
    }

    // Création du professeur en base de données
    const user = await prisma.professeur.create({
      data: {
        nom,
        prenom,
        email,
        telephone,
        matieres,
        statut,
        password: hashedPassword,
        photo: photoUrl, // Stocker l'URL de la photo
      },
    });

    return new Response(JSON.stringify({ message: "Inscription réussie." }), { status: 201 });
  } catch (error) {
    console.error("Erreur serveur :", error);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), { status: 500 });
  }
}
