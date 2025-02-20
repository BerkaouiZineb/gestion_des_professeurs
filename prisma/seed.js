const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  // Hachage du mot de passe administrateur
  const hashedPassword = await bcrypt.hash("0000", 10);

  // Création d'un administrateur par défaut
  await prisma.admin.upsert({
    where: { email: "a.selami@example.com" },
    update: {},
    create: {
      nom: "Selami",
      prenom: "Adil",
      email: "a.selami@example.com",
      telephone: "0600112233",
      password: hashedPassword,
    },
  });

  console.log("Compte administrateur créé avec succès.");
}

main()
  .catch((e) => {
    console.error("Erreur lors du seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
