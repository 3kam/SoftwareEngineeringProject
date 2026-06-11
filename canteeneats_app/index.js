import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 📁 Link your static assets (CSS, JS images)
app.use("/static", express.static(path.join(__dirname, "static")));

// 🚪 Catch-all route for Express v5: Serves your core canteen menu view
app.get("(.*)", (req, res) => {
  res.sendFile(path.join(__dirname, "templates", "base.html"));
});

const PORT = 8000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`CanteenEats running successfully at http://localhost:${PORT}`);
});