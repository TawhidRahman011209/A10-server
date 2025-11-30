// middleware/firebase_admin.js
import admin from "firebase-admin";

// Load service account
let serviceAccount = null;

if (!admin.apps.length) {
  try {
    // OPTION 1: Using file (local dev)
    serviceAccount = await import("../firebase-service-account.json", {
      assert: { type: "json" }
    });

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount.default),
    });
  } catch (e) {
    console.error("Firebase service account load failed:", e);
  }
}

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded; // uid, email, name, picture
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default admin;
