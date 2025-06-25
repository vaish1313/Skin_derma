
const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../db");
const jwt = require("jsonwebtoken"); // if you plan to use JWT
const JWT_SECRET = "your-secret-key";

const router = express.Router();

// REGISTER USER
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("Incoming data:", req.body);

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if user already exists
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
      if (err) {
        console.error("MySQL Error:", err);
        return res.status(500).json({ message: "Database error." });
      }

      if (result.length > 0) {
        return res.status(409).json({ message: "Email already exists." });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user
      db.query(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, hashedPassword],
        (err, result) => {
          if (err) {
            console.error("Insert Error:", err);
            return res.status(500).json({ message: "Error saving user." });
          }

          return res.status(200).json({ message: "Registration successful!" });
        }
      );
    });
  } catch (error) {
    console.error("❌ Register Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Find user by email
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) {
      console.error("Login error:", err);
      return res.status(500).json({ message: "Database error." });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const user = result[0];

    // Compare entered password with hashed one
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // ✅ If you want to use JWT (optional)
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "2h",
    });

    return res.status(200).json({
      message: "Login successful!",
      token, // optional
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  });
});

module.exports = router;

const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../db");
const jwt = require("jsonwebtoken"); // if you plan to use JWT
const JWT_SECRET = "your-secret-key";

const router = express.Router();

// REGISTER USER
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("Incoming data:", req.body);

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if user already exists
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
      if (err) {
        console.error("MySQL Error:", err);
        return res.status(500).json({ message: "Database error." });
      }

      if (result.length > 0) {
        return res.status(409).json({ message: "Email already exists." });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user
      db.query(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, hashedPassword],
        (err, result) => {
          if (err) {
            console.error("Insert Error:", err);
            return res.status(500).json({ message: "Error saving user." });
          }

          return res.status(200).json({ message: "Registration successful!" });
        }
      );
    });
  } catch (error) {
    console.error("❌ Register Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Find user by email
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) {
      console.error("Login error:", err);
      return res.status(500).json({ message: "Database error." });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const user = result[0];

    // Compare entered password with hashed one
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // ✅ If you want to use JWT (optional)
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "2h",
    });

    return res.status(200).json({
      message: "Login successful!",
      token, // optional
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  });
});

module.exports = router;
 4a40d26f4cfb5c8be7c965dc401165e017be6eed
