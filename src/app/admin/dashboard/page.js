"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { generateProfesseurPDF } from "../../../utils/ganaratePDF"; // Importation de la fonction de génération de PDF
import "../../globals.css";

export default function AdminDashboard() {
  const router = useRouter();
  const [professeurs, setProfesseurs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfesseurs = async () => {
      try {
        const response = await fetch("/api/admin/professeurs");
        const data = await response.json();
        if (!response.ok) {
          setError(data.error || "Erreur lors du chargement des professeurs");
          return;
        }
        setProfesseurs(data);
      } catch (error) {
        setError("Erreur serveur");
      }
    };

    fetchProfesseurs();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce professeur ?")) {
      try {
        const response = await fetch(`/api/admin/professeurs/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          setError("Erreur lors de la suppression");
          return;
        }
        setProfesseurs(professeurs.filter((prof) => prof.id !== id));
      } catch (error) {
        setError("Erreur serveur");
      }
    }
  };

  const handleGeneratePDF = async (professeur) => {
    try {
      await generateProfesseurPDF(professeur); // Appel de la fonction pour générer le PDF
    } catch (error) {
      console.error("Erreur lors de la génération du PDF :", error);
      setError("Erreur lors de la génération du PDF");
    }
  };

  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div >
      <h1 className="title">Tableau de Bord Administrateur</h1>
  
      <div className="card">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {professeurs.map((prof) => (
              <tr key={prof.id}>
                <td>{prof.nom}</td>
                <td>{prof.prenom}</td>
                <td>{prof.email}</td>
                <td>{prof.telephone}</td>
                <td className="actions">
                  <Link href={`/admin/professeurs/edit/${prof.id}`} className="btn btn-edit">
                    Modifier
                  </Link>
                  <button onClick={() => handleDelete(prof.id)} className="btn btn-delete">
                    Supprimer
                  </button>
                  <button onClick={() => handleGeneratePDF(prof)} className="btn btn-print">
                    Imprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  /*
  return (
    <div className="container">
      <h1 className="my-4 text-center">Tableau de Bord Administrateur</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {professeurs.map((prof) => (
            <tr key={prof.id}>
              <td>{prof.nom}</td>
              <td>{prof.prenom}</td>
              <td>{prof.email}</td>
              <td>{prof.telephone}</td>
              <td>
                <Link href={`/admin/professeurs/edit/${prof.id}`} className="btn btn-primary btn-sm me-2">
                  Modifier
                </Link>
                <button onClick={() => handleDelete(prof.id)} className="btn btn-danger btn-sm me-2">
                  Supprimer
                </button>
                <button onClick={() => handleGeneratePDF(prof)} className="btn btn-success btn-sm">
                  Imprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  */
}