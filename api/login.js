// api/login.js - Fixed for Vercel deployment
const VALID_USERNAME = "AbidBLA";
const VALID_PASSWORD = "Abid@123";

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    // ✅ Parse JSON body manually (Vercel doesn’t do this automatically)
    let body = req.body;
    if (typeof body === "string") {
      body = JSON.parse(body);
    }

    const { username, password } = body || {};
    console.log("Received login:", username, password);

    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Username and password are required" });
    }

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      return res.status(200).json({ success: true, message: "Login successful" });
    }

    return res.status(401).json({ success: false, message: "Invalid username or password" });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
