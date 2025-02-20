
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "../../globals.css";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      setError(data.error || "Erreur de connexion");
      return;
    }

    localStorage.setItem("adminToken", data.token);
    router.push("/admin/dashboard");
  };
/*
  return (
    <div className="container mt-5">
      <h2 className="text-center">Connexion Administrateur</h2>

      {error && <div className="alert alert-danger text-center">{error}</div>}

      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "400px" }}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Entrez votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Mot de passe</label>
          <input
            type="password"
            className="form-control"
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Se connecter</button>
      </form>
    </div>
  );
*/
return (
    <div className="container">
      <h2 className="title">Connexion Administrateur</h2>
  
      {error && <div className="error-message">{error}</div>}
  
      <div className="login-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Entrez votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
  
          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
  
          <button type="submit" className="btn">Se connecter</button>
        </form>
      </div>
    </div>
  );

  }