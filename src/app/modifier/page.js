"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../globals.css";
export default function ModifierProf() {
  const router = useRouter();
  const [formData, setFormData] = useState(null);
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
            "Authorization": `Bearer ${token}`, // Ajout du token ici
          },
        });

        const data = await response.json();
        if (!response.ok) {
          setError(data.error);
        } else {
          setFormData(data);
        }
      } catch (err) {
        setError("Erreur lors du chargement des données.");
      }
      setLoading(false);
    };

    fetchProfesseur();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token manquant, veuillez vous reconnecter.");
      return;
    }

    try {
      const response = await fetch("/api/professeurs/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Ajout du token ici
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Modification réussie !");
        router.push("/welcome");
      } else {
        alert(data.error || "Erreur lors de la modification.");
      }
    } catch (error) {
      alert("Erreur serveur.");
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!formData) return <p>Aucune donnée disponible</p>;

  return (
    <div className="container">
      <h1 className="title">Modifier mes informations</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nom">Nom</label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className="form-control"
              placeholder="Nom"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="prenom">Prénom</label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              className="form-control"
              placeholder="Prénom"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="telephone">Téléphone</label>
            <input
              type="text"
              id="telephone"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              className="form-control"
              placeholder="Téléphone"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="matieres">Matière(s)</label>
            <input
              type="text"
              id="matieres"
              name="matieres"
              value={formData.matieres}
              onChange={handleChange}
              className="form-control"
              placeholder="Matière(s)"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="statut">Statut</label>
            <select
              name="statut"
              id="statut"
              value={formData.statut}
              onChange={handleChange}
              className="form-control"
            >
              <option value="permanent">Permanent</option>
              <option value="vacataire">Vacataire</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">Enregistrer</button>
        </form>
      </div>
    </div>
  );
}
