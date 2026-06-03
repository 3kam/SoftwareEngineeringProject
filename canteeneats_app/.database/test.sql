-- 1. CLEANUP REGISTRY
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS CanteenItems;
DROP TABLE IF EXISTS Users;

-- 2. CREATE SYSTEM TABLES
CREATE TABLE Users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'Student',
    prepaid_balance REAL DEFAULT 0.00
);

CREATE TABLE CanteenItems (
    item_id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL,
    is_vegetarian INTEGER DEFAULT 0,
    stock_level INTEGER DEFAULT 0
);

CREATE TABLE Orders (
    order_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    item_id INTEGER NOT NULL,
    quantity INTEGER DEFAULT 1,
    target_period TEXT NOT NULL,
    status TEXT DEFAULT 'Received',
    timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES Users(user_id),
    FOREIGN KEY(item_id) REFERENCES CanteenItems(item_id)
);

-- 3. INJECT TEST SEED RECORDS
INSERT INTO Users (username, password_hash, role, prepaid_balance) VALUES 
('student1@smshs.com', 'scrypt:32768:8:1$hash1', 'Student', 25.50),
('student2@smshs.com', 'scrypt:32768:8:1$hash2', 'Student', 4.20),
('kitchen_staff@smshs.com', 'scrypt:32768:8:1$hash3', 'Staff', 0.00),
('admin_canteen@smshs.com', 'scrypt:32768:8:1$hash4', 'Admin', 100.00);

INSERT INTO CanteenItems (item_name, price, category, is_vegetarian, stock_level) VALUES 
('Veggie Burger', 5.50, 'Hot Food', 1, 12),
('Chicken Schnitzel Roll', 6.50, 'Hot Food', 0, 8),
('Large Salad Bowl', 4.80, 'Cold Food', 1, 5),
('Chocolate Oak Milk', 3.50, 'Drinks', 0, 20),
('Fresh Apple', 1.20, 'Snacks', 1, 15);

INSERT INTO Orders (user_id, item_id, quantity, target_period, status) VALUES 
(1, 1, 1, 'Recess', 'Preparing'),
(1, 4, 1, 'Recess', 'Ready'),
(2, 2, 1, 'Lunch', 'Received');
