import express from 'express';
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

// Point to the database file (adjust the path if necessary)
const dbPath = path.join(__dirname, '..', '.database', 'database.db');
const db = new sqlite3.Database(dbPath);

// API Endpoint to fetch items
router.get('/menu-items', (req, res) => {
    db.all("SELECT * FROM CanteenItems", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

export default router;