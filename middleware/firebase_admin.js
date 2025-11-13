import admin from "firebase-admin";


export function initializeFirebaseAdmin() {
  if (admin.apps.length) return;

  try {
   
    admin.initializeApp();
    console.log("✅ Firebase Admin initialized");
  } catch (err) {
    console.warn("⚠️ Firebase Admin not initialized. Provide GOOGLE_APPLICATION_CREDENTIALS to enable token verification.");
  }
}

export async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const bearer = authHeader.split(" ")[0] === "Bearer";
  const token = bearer ? authHeader.split(" ")[1] : null;

  if (!token) {
    return res.status(401).json({ message: "Missing or invalid token" });
  }

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Firebase token verification failed:", err.message || err);
    return res.status(401).json({ message: "Unauthorized - invalid token" });
  }
}
