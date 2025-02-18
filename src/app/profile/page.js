"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Welcome() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
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
    router.push("/modifier"); // Redirige vers la page de modification du profil
  };

  const handlePrint = () => {
    router.push("/imprimer"); // Redirige vers la génération de la carte PDF
  };

  return (
    <div>
      {/* Header avec les options */}
      <header style={styles.header}>
        <button onClick={handleModify} style={styles.button}>Modifier</button>
        <button onClick={handlePrint} style={styles.button}>Imprimer</button>
        <button onClick={handleLogout} style={styles.button}>Déconnexion</button>
      </header>

      <h1>Bienvenue {user ? `${user.nom} ${user.prenom}` : ""}</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {user && (
        <div>
          <p>Email : {user.email}</p>
          <p>Téléphone : {user.telephone}</p>
          <p>Matières enseignées : {user.matieres}</p>
          <p>Statut : {user.statut}</p>
          {user.photo && <img src={user.photo} alt="Photo de profil" width="150" />}
        </div>
      )}
    </div>
  );
}

const styles = {
  header: {
    position: "fixed", // Fixe le header en haut
    top: 0, // Assure que le header est bien en haut
    left: 0,
    width: "100%", // Le header occupe toute la largeur
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#22a6b3",
    padding: "10px 20px",
    color: "white",
    borderRadius: "5px",
    zIndex: 1000, // Assure que le header soit au-dessus du contenu
  },
  button: {
    backgroundColor: "#22a6b3",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    marginLeft: "10px",
  },
  content: {
    marginTop: "80px", // Espace pour ne pas que le contenu soit masqué sous le header
    padding: "20px", // Ajout de padding pour aérer le contenu
  },
};

  ;
