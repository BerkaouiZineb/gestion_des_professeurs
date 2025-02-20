"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EditProfesseur({ params }) {
  const router = useRouter();
  const { id } = params;
  const [professeur, setProfesseur] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfesseur = async () => {
      try {
        const response = await fetch(`/api/admin/professeurs/${id}`);
        const data = await response.json();
        if (!response.ok) {
          setError(data.error || "Erreur lors du chargement du professeur");
          return;
        }
        setProfesseur(data);
      } catch (error) {
        setError("Erreur serveur");
      }
    };

    fetchProfesseur();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/admin/professeurs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(professeur),
      });
      if (!response.ok) {
        setError("Erreur lors de la modification");
        return;
      }
      router.push("/admin/dashboard");
    } catch (error) {
      setError("Erreur serveur");
    }
  };

  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container">
      <h1 className="my-4">Modifier le Professeur</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nom</label>
          <input
            type="text"
            className="form-control"
            value={professeur.nom || ""}
            onChange={(e) => setProfesseur({ ...professeur, nom: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Prénom</label>
          <input
            type="text"
            className="form-control"
            value={professeur.prenom || ""}
            onChange={(e) => setProfesseur({ ...professeur, prenom: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={professeur.email || ""}
            onChange={(e) => setProfesseur({ ...professeur, email: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Téléphone</label>
          <input
            type="text"
            className="form-control"
            value={professeur.telephone || ""}
            onChange={(e) => setProfesseur({ ...professeur, telephone: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Matières</label>
          <input
            type="text"
            className="form-control"
            value={professeur.matieres || ""}
            onChange={(e) => setProfesseur({ ...professeur, matieres: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Statut</label>
          <input
            type="text"
            className="form-control"
            value={professeur.statut || ""}
            onChange={(e) => setProfesseur({ ...professeur, statut: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Enregistrer</button>
        <Link href="/admin/dashboard" className="btn btn-secondary ms-2">Annuler</Link>
      </form>
    </div>
  );
}