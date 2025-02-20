import { jsPDF } from "jspdf";
import QRCode from "qrcode";

export const generateProfesseurPDF = async (professeur) => {
  const doc = new jsPDF();

  // Couleurs personnalisées
  const primaryColor = [40, 40, 40]; // Noir
  const secondaryColor = [100, 100, 100]; // Gris
  const accentColor = [0, 102, 204]; // Bleu

  // Titre de la carte
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...primaryColor);
  doc.text("Carte Professionnelle", 105, 20, { align: "center" }); // Centrer le titre

  // Ligne de séparation sous le titre
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.5);
  doc.line(20, 25, 190, 25); // Ligne horizontale

  // Photo du professeur (si elle existe)
  if (professeur.photo) {
    const img = new Image();
    img.src = professeur.photo;
    await doc.addImage(img, "JPEG", 85, 40, 40, 40); // Centrer la photo
  }

  // Informations du professeur (centrées)
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...primaryColor);

  // Nom et prénom
  doc.text(`Nom : ${professeur.nom || "N/A"} ${professeur.prenom || "N/A"}`, 105, 90, { align: "center" });

  // Email
  doc.text(`Email : ${professeur.email || "N/A"}`, 105, 100, { align: "center" });

  // Matières
  doc.text(`Matières : ${professeur.matieres || "N/A"}`, 105, 110, { align: "center" });

  // Ligne de séparation avant le QR Code
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.5);
  doc.line(20, 120, 190, 120); // Ligne horizontale

  // Générer un QR Code
  const qrCodeData = `Professeur: ${professeur.nom} ${professeur.prenom}\nEmail: ${professeur.email || "N/A"}\nMatières: ${professeur.matieres || "N/A"}`;
  const qrCodeUrl = await QRCode.toDataURL(qrCodeData);
  await doc.addImage(qrCodeUrl, "PNG", 85, 130, 40, 40); // Centrer le QR Code

  // Pied de page
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...secondaryColor);
  doc.text("© 2025 ", 105, 190, { align: "center" }); // Centrer le texte

  // Bordure autour de la carte
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.5);
  doc.rect(10, 10, 190, 180); // Ajustez les dimensions pour correspondre à la carte

  // Sauvegarder le PDF
  doc.save(`carte_professeur_${professeur.id}.pdf`);
};
