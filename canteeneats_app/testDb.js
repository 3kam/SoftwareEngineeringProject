// testDb.js - A simple script to test the SQLite database connection and query the CanteenItems table
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure this path matches where your initdb.js created the file
const dbPath = path.join(__dirname, '.database', 'database.db');
const db = new sqlite3.Database(dbPath);

console.log('Testing connection to:', dbPath);

db.all("SELECT * FROM CanteenItems", [], (err, rows) => {
    if (err) {
        console.error("Database Error:", err.message);
    } else if (rows.length === 0) {
        console.log("Database connected, but the CanteenItems table is EMPTY.");
    } else {
        console.log("Success! Found " + rows.length + " items:");
        console.table(rows);
    }
    db.close();
});