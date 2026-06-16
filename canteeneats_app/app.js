// app.js
import express from "express";
import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import menuRoutes from "./orders/menuRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware Configurations
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(__dirname, "static")));

// Mount external menu routes
app.use("/api", menuRoutes);

// --- DATABASE CONNECTION ---
const dbPath = path.join(__dirname, ".database", 'database.db');
const db = new sqlite3.Database(dbPath, async (err) => {
    if (err) {
        console.error("Database connection error:", err.message);
    } else {
        console.log("Connected to the SQLite database successfully.");
        
        // --- DEVELOPER PASSWORD RESETTER ---
        // This converts your old database scrypt hashes into bcrypt hashes automatically!
        try {
            const saltRounds = 10;
            const adminHash = await bcrypt.hash("admin123", saltRounds);
            const staffHash = await bcrypt.hash("staff123", saltRounds);

            db.serialize(() => {
                db.run("UPDATE Users SET password_hash = ? WHERE username = 'admin'", [adminHash]);
                db.run("UPDATE Users SET password_hash = ? WHERE username = 'canteenstaff'", [staffHash]);
                console.log(" New bcrypt passwords applied: admin -> admin123 | canteenstaff -> staff123");
            });
        } catch (hashError) {
            console.error("Failed to seed developer passwords:", hashError);
        }
    }
});

// Anti-Caching Middleware (Ensures back button is blocked after logout)
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
});

// --- GET ROUTES: Serving HTML Pages ---
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "templates", "base.html")));
app.get("/login", (req, res) => res.sendFile(path.join(__dirname, "templates", "login.html")));
app.get("/register", (req, res) => res.sendFile(path.join(__dirname, "templates", "register.html")));
app.get("/about", (req, res) => res.sendFile(path.join(__dirname, "templates", "about.html")));
app.get("/edit_account", (req, res) => res.sendFile(path.join(__dirname, "templates", "edit_account.html")));
app.get("/manage_orders", (req, res) => res.sendFile(path.join(__dirname, "templates", "manage_orders.html")));
app.get("/menu", (req, res) => res.sendFile(path.join(__dirname, "templates", "menu.html")));
app.get("/my_orders", (req, res) => res.sendFile(path.join(__dirname, "templates", "my_orders.html")));

// --- AUTHENTICATION API ENDPOINTS ---

// Registration API
app.post("/api/auth/register", async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required." });
    }

    let assignedRole = "Student";
    if (username.toLowerCase() === "admin") assignedRole = "Administrator";
    else if (username.toLowerCase() === "canteenstaff") assignedRole = "Staff";

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        db.run(
            "INSERT INTO Users (username, password_hash, role, prepaid_balance) VALUES (?, ?, ?, ?)",
            [username, hashedPassword, assignedRole, 12.00],
            function (err) {
                if (err) {
                    if (err.message.includes("UNIQUE constraint failed")) {
                        return res.status(400).json({ error: "Username is already taken." });
                    }
                    return res.status(500).json({ error: "Database registration error." });
                }
                console.log(`[REGISTER] New user added to DB: ${username} (${assignedRole})`);
                res.json({ success: true });
            }
        );
    } catch (error) {
        res.status(500).json({ error: "Encryption breakdown." });
    }
});

// Login API
app.post("/api/auth/login", (req, res) => {
    const { username, password } = req.body;

    db.get("SELECT * FROM Users WHERE username = ?", [username], async (err, user) => {
        if (err) return res.status(500).json({ error: "Database error during lookup." });
        if (!user) return res.status(400).json({ error: "User cannot be found." });

        try {
            const isMatch = await bcrypt.compare(password, user.password_hash);
            if (isMatch) {
                console.log(`[LOGIN] Successful authentication for: ${username}`);
                // Return user metrics to frontend so it can populate localStorage sessions properly
                res.json({ 
                    id: user.user_id, 
                    username: user.username, 
                    role: user.role, 
                    balance: user.prepaid_balance 
                });
            } else {
                res.status(400).json({ error: "Incorrect password." });
            }
        } catch (error) {
            res.status(500).json({ error: "Password validation breakdown." });
        }
    });
});

// --- STAFF KITCHEN DISPATCH QUEUE ---
app.get('/api/staff/queue', (req, res) => {
    const query = `
        SELECT Orders.order_id, Users.username, CanteenItems.item_name, Orders.quantity, Orders.target_period AS pickup_period, Orders.status 
        FROM Orders
        JOIN Users ON Orders.user_id = Users.user_id
        JOIN CanteenItems ON Orders.item_id = CanteenItems.id
        WHERE Orders.status != 'Done'
        ORDER BY Orders.order_id ASC`;
    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

export default app;