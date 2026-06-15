// app.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware Configurations
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Link your static assets
app.use("/static", express.static(path.join(__dirname, "static")));

// Temporary local array acting as a mock user database
const users = [];

// GET Routes: Serving HTML pages
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "templates", "base.html")));
app.get("/login", (req, res) => res.sendFile(path.join(__dirname, "templates", "login.html")));
app.get("/register", (req, res) => res.sendFile(path.join(__dirname, "templates", "register.html")));

// Registration POST Route (with Hashing)
app.post("/auth/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = { username, email, password: hashedPassword };
    users.push(newUser);

    console.log("--- USER REGISTERED SECURELY ---");
    console.log("Hashed Password saved:", hashedPassword);
    console.log("--------------------------------\n");

    res.redirect("/login");
  } catch (error) {
    res.status(500).send("Error creating account");
  }
});

// Login POST Route (with Hash Verification)
app.post("/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(400).send("User cannot be found.");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      console.log(`Login successful for user: ${username}`);
      res.redirect("/");
    } else {
      console.log(`Invalid login attempt for user: ${username}`);
      res.status(400).send("Incorrect password.");
    }
  } catch (error) {
    res.status(500).send("Internal server error during login");
  }
});

// Export the configured app object so index.js can launch it
export default app;