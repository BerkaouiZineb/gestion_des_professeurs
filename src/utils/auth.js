import jwt from "jsonwebtoken";

export function verifyAdminToken(req) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return { error: "Accès interdit", status: 403 };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return { error: "Accès non autorisé", status: 403 };
    }

    return { adminId: decoded.id };
  } catch (error) {
    return { error: "Token invalide ou expiré", status: 401 };
  }
}
