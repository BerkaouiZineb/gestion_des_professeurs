"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "../globals.css";
export default function Register() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [matieres, setMatieres] = useState("");
  const [statut, setStatut] = useState("permanent");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("prenom", prenom);
    formData.append("email", email);
    formData.append("telephone", telephone);
    formData.append("matieres", matieres);
    formData.append("statut", statut);
    formData.append("password", password);
    if (photo) formData.append("photo", photo); 

    const response = await fetch("/api/register", {
      method: "POST",
      body: formData, 
    });

    const data = await response.json();
    if (!response.ok) {
      setError(data.error);
      return;
    }

    router.push("/");
  };

  return (
    <div className="container">
      <h1 className="title">Créer un compte</h1>
      <div className="card p-4">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="nom">Nom</label>
            <input
              type="text"
              id="nom"
              className="form-control"
              placeholder="Nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="prenom">Prénom</label>
            <input
              type="text"
              id="prenom"
              className="form-control"
              placeholder="Prénom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="telephone">Téléphone</label>
            <input
              type="text"
              id="telephone"
              className="form-control"
              placeholder="Téléphone"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="matieres">Matières</label>
            <input
              type="text"
              id="matieres"
              className="form-control"
              placeholder="Matières"
              value={matieres}
              onChange={(e) => setMatieres(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="statut">Statut</label>
            <select
              id="statut"
              className="form-control"
              value={statut}
              onChange={(e) => setStatut(e.target.value)}
            >
              <option value="permanent">Permanent</option>
              <option value="vacataire">Vacataire</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="photo">Photo</label>
            <input
              type="file"
              id="photo"
              className="form-control-file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-3">
            S'inscrire
          </button>
        </form>
        {error && <p className="text-danger mt-3">{error}</p>}
      </div>
    </div>
  );
}
