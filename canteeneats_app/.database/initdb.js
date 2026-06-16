import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'database.db');
const sqlPath = path.join(__dirname, 'myquery.sql');

const db = new sqlite3.Database(dbPath);

console.log('Initializing database...');

// Read SQL file
const sql = fs.readFileSync(sqlPath, 'utf-8');

// Execute SQL statements
db.serialize(() => {
  // Split by semicolon and execute each statement
  const statements = sql.split(';').filter(stmt => stmt.trim());
  
  statements.forEach((stmt, index) => {
    db.run(stmt, function(err) {
      if (err) {
        console.error(`Error executing statement ${index + 1}:`, err.message);
      } else {
        console.log(`✓ Statement ${index + 1} executed`);
      }
    });
  });

  // Final verification
  db.all("SELECT COUNT(*) as count FROM CanteenItems", (err, rows) => {
    if (err) {
      console.error('Error counting items:', err.message);
    } else {
      console.log(`✓ Database initialized with ${rows[0].count} menu items`);
    }
    db.close();
  });
});
