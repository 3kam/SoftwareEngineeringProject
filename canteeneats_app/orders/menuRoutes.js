// orders/menuRoutes.js
const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// 1. IMPORT YOUR EXISTING ROLE MANAGER
const { getNavigationForRole } = require('./roleManager');

// Target the shared SQLite database file path securely
const dbPath = path.join(__dirname, '..', '.database', 'database.db');


/**
 * 2. ROLE-BASED NAVIGATION ENDPOINT
 * Uses your roleManager.js to send authorized links to ui.js
 */
router.get('/api/navigation', (req, res) => {
    // Falls back to 'Student' if no explicit query role or session token is passed
    const userRole = req.query.role || "Student"; 
    
    // Executes your exact module function
    const links = getNavigationForRole(userRole);
    res.json(links);
});


/**
 * 3. RELATIONAL DATABASE MENU & CATEGORY ENDPOINTS
 * Pulls the raw SQLite rows out to populate your UI elements
 */

// API Route: Fetches your 16 distinct categories from the database
router.get('/api/categories', (req, res) => {
    const db = new sqlite3.Database(dbPath);
    const query = "SELECT DISTINCT category FROM CanteenItems ORDER BY category ASC;";
    
    db.all(query, [], (err, rows) => {
        db.close(); // Clean up thread resources immediately
        if (err) return res.status(500).json({ error: err.message });
        
        const categories = rows.map(row => row.category);
        res.json(categories);
    });
});

// API Route: Fetches full food items table list for card grid generation
router.get('/api/menu-items', (req, res) => {
    const db = new sqlite3.Database(dbPath);
    const query = "SELECT id, item_name, price, category, is_vegetarian, is_gluten_free, is_everyday_items, is_occasional_items, stock_level FROM CanteenItems;";
    
    db.all(query, [], (err, rows) => {
        db.close(); // Clean up thread resources immediately
        if (err) return res.status(500).json({ error: err.message });
        
        // Sends raw rows directly back to cart.js / ui.js for dynamic grid assembly
        res.json(rows);
    });
});


/**
 * 4. USER INTERFACE PAGES ROUTING
 * Delivers the physical layout template wireframes to the client engine
 */

// Serves the main menu selection workspace
router.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'templates', 'menu.html'));
});

// Serves the checkout / my orders viewport framework
router.get('/myorders', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'templates', 'myourders.html'));
});

// Serves the kitchen dashboard for canteen staff profiles
router.get('/manage-items', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'templates', 'manage_items.html'));
});

// Serves the admin management layout portal
router.get('/edit-account', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'templates', 'edit_account.html'));
});

// Serves standard static meta info frames
router.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'templates', 'about.html'));
});

router.get('/setting', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'templates', 'setting.html'));
});

module.exports = router;