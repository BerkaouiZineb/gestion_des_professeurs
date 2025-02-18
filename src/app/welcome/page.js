"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../globals.css";
export default function Welcome() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/");
          return;
        }

        const response = await fetch("/api/profile", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (!response.ok) {
          setError(data.error);
          return;
        }

        setUser(data);
      } catch (error) {
        setError("Erreur lors de la récupération des données.");
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const handleModify = () => {
    router.push("/modifier");
  };

  const handlePrint = () => {
    router.push("/imprimer");
  };

  return (
    <div className="container">
      <h1 className="my-4 text-center">Bienvenue {user ? `${user.nom} ${user.prenom}` : ""}</h1>

      {/* Header avec les liens */}
<header>
  <nav className="link-group">
    <a onClick={handleModify} className="text-decoration-none text-secondary">Modifier</a>
    <a onClick={handlePrint} className="text-decoration-none text-info">Imprimer</a>
    <a onClick={handleLogout} className="text-decoration-none text-danger">Déconnexion</a>
  </nav>
</header>


      {error && <p className="text-danger">{error}</p>}

      {user && (
        <div className="card p-4">
          <p><strong>Email :</strong> {user.email}</p>
          <p><strong>Téléphone :</strong> {user.telephone}</p>
          <p><strong>Matières enseignées :</strong> {user.matieres}</p>
          <p><strong>Statut :</strong> {user.statut}</p>
          {user.photo && <img src={user.photo} alt="Photo de profil" className="img-fluid mt-3" width="150" />}
        </div>
      )}
    </div>
  );
}

