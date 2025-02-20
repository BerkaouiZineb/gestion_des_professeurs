Gestion des Professeurs - Application Web
Description
Cette application web permet aux administrateurs de gérer les professeurs d'un établissement scolaire. Elle inclut les fonctionnalités suivantes :

Connexion administrateur : Authentification sécurisée pour accéder au tableau de bord.

Tableau de bord : Affichage de la liste des professeurs avec des actions (modifier, supprimer, imprimer une carte professionnelle).

Gestion des professeurs : Ajout, modification et suppression des informations des professeurs.

Génération de PDF : Création d'une carte professionnelle pour chaque professeur avec un QR Code.

Technologies utilisées
Frontend : Next.js (React), CSS Modules.

Backend : API routes de Next.js.

Base de données : MySQL avec Prisma pour la gestion des migrations et des requêtes.

Autres bibliothèques :

jsPDF et jspdf-autotable pour la génération de PDF.

qrcode pour la génération de QR Code.

bcrypt pour le hachage des mots de passe.

jsonwebtoken pour l'authentification sécurisée.