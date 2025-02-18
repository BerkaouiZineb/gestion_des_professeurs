"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import "jspdf-autotable";
import QRCode from "qrcode";
import "../globals.css";

export default function Imprimer() {
  const [professeur, setProfesseur] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfesseur = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token manquant, veuillez vous reconnecter.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/professeurs/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (!response.ok) {
          setError(data.error);
        } else {
          setProfesseur(data);
        }
      } catch (err) {
        setError("Erreur lors du chargement des données.");
      }
      setLoading(false);
    };

    fetchProfesseur();
  }, []);

  const genererPDF = async () => {
    if (!professeur) return;
    const doc = new jsPDF();

    const cardWidth = 200;
    const cardHeight = 90;

    doc.setFillColor(52, 122, 184);
    doc.rect(0, 0, cardWidth, 20, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.text("Carte Professionnelle", cardWidth / 2, 14, { align: "center" });

    doc.setTextColor(0, 0, 0);

    if (professeur.photo) {
      try {
        const photoUrl = professeur.photo;
        const photo = await fetch(photoUrl).then((res) => res.blob());
        const photoUrlBase64 = URL.createObjectURL(photo);
        doc.addImage(photoUrlBase64, "JPEG", 10, 25, 25, 25);
      } catch (error) {
        console.error("Erreur lors du chargement de la photo", error);
      }
    } else {
      doc.setFontSize(10);
      doc.text("Pas de photo", 12, 40);
    }

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Nom : ${professeur.nom} ${professeur.prenom}`, 45, 35);
    doc.text(`Matière : ${professeur.matieres}`, 45, 48);

    try {
      const qrCodeURL = await QRCode.toDataURL(`http://localhost:3000/profile/${professeur.id}`);
      doc.addImage(qrCodeURL, "PNG", 140, 25, 30, 30);
      doc.setFontSize(9);
      doc.setTextColor(0, 128, 0);
      doc.text("Plus d'informations", 147, 60);
      doc.setLineWidth(0.3);
      doc.setTextColor(0, 0, 0);
    } catch (error) {
      console.error("Erreur QR Code", error);
      doc.setFontSize(10);
      doc.text("QR Code Indisponible", 142, 45);
    }

    doc.save("carte_professeur.pdf");
  };

  return (
    <div className="container">
      <h1 className="title">Imprimer la carte professionnelle</h1>

      <div className="card">
        {loading ? (
          <p>Chargement...</p>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : professeur ? (
          <>
            <p><strong>Nom :</strong> {professeur.nom} {professeur.prenom}</p>
            <p><strong>Matière :</strong> {professeur.matieres}</p>

            <button onClick={genererPDF} className="btn">
              Télécharger la carte
            </button>
          </>
        ) : (
          <p>Aucune donnée disponible</p>
        )}
      </div>
    </div>
  );
}
