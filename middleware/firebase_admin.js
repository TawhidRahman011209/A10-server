import admin from "firebase-admin";
import fs from "fs";

let serviceAccount;

if (!admin.apps.length) {
  try {
    // ✅ Read JSON manually (no import/assert issues)
    const raw = fs.readFileSync("./firebase-service-account.json", "utf-8");
    serviceAccount = JSON.parse(raw);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    console.log("✅ Firebase Admin initialized");
  } catch (e) {
    console.error("❌ Firebase init failed:", e);
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

    req.user = decoded; // uid, email
    next();
  } catch (err) {
    console.error("❌ Token verification failed:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default admin;