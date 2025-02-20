import { jsPDF } from "jspdf";
import "jspdf-autotable";
import QRCode from "qrcode";

export const generateProfesseurPDF = async (professeur) => {
  const doc = new jsPDF();

  // Titre de la carte
  doc.setFontSize(18);
  doc.text("Carte Professionnelle", 10, 20);

  // Informations du professeur
  const data = [
    ["Nom", professeur.nom],
    ["Prénom", professeur.prenom],
    ["Email", professeur.email],
    ["Téléphone", professeur.telephone],
    ["Matières", professeur.matieres],
    ["Statut", professeur.statut],
  ];

  // Ajouter un tableau avec les informations
  doc.autoTable({
    startY: 30,
    head: [["Champ", "Valeur"]],
    body: data,
    theme: "striped",
  });

  // Ajouter la photo (si elle existe)
  if (professeur.photo) {
    const img = new Image();
    img.src = professeur.photo;
    await doc.addImage(img, "JPEG", 150, 30, 40, 40); // Ajustez la position et la taille
  }

  // Générer un QR Code
  const qrCodeData = `Professeur: ${professeur.nom} ${professeur.prenom}\nEmail: ${professeur.email}\nTéléphone: ${professeur.telephone}\nMatières: ${professeur.matieres}`;
  const qrCodeUrl = await QRCode.toDataURL(qrCodeData);
  await doc.addImage(qrCodeUrl, "PNG", 150, 80, 40, 40); // Ajustez la position et la taille

  // Sauvegarder le PDF
  doc.save(`carte_professeur_${professeur.id}.pdf`);
};