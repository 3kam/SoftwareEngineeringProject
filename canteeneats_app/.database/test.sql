-- Flush existing placeholder menu items to populate real school options
DELETE FROM CanteenItems;

-- INJECT SMSHS CANTEEN MENU DATA
INSERT INTO CanteenItems (item_name, price, category, is_vegetarian, stock_level) VALUES 

-- 1. SANDWICHES & WRAPS
('Cheese & Tomato Sandwich / Wrap', 5.00, 'Sandwiches & Wraps', 1, 15),
('Ham & Cheese Sandwich / Wrap', 5.00, 'Sandwiches & Wraps', 0, 15),
('Ham, Cheese & Tomato Sandwich / Wrap', 5.60, 'Sandwiches & Wraps', 0, 15),
('Egg & Lettuce w/Mayo Sandwich / Wrap', 5.60, 'Sandwiches & Wraps', 1, 10),
('Curried Egg & Lettuce w/Mayo Sandwich / Wrap', 5.60, 'Sandwiches & Wraps', 1, 10),
('Sweet Chilli Chicken, Lettuce & Mayo Wrap', 7.80, 'Sandwiches & Wraps', 0, 20),
('Chicken, Lettuce & Mayo Wrap', 7.80, 'Sandwiches & Wraps', 0, 20),
('Avocado Salad Wrap', 8.30, 'Sandwiches & Wraps', 1, 12),
('Chicken, Avocado & Lettuce Wrap', 8.30, 'Sandwiches & Wraps', 0, 15),
('Chicken Caesar Wrap', 8.30, 'Sandwiches & Wraps', 0, 15),
('Falafels w/Lettuce, Tomato & Aioli Wrap', 8.30, 'Sandwiches & Wraps', 1, 12),

-- 2. SALADS
('Garden Salad Bowl (GF)', 7.50, 'Salads', 1, 8),
('Caesar Salad Bowl', 7.50, 'Salads', 1, 8),
('Avocado Salad Bowl', 8.30, 'Salads', 1, 6),
('Sweet Chilli Chicken Salad Bowl', 8.30, 'Salads', 0, 10),
('Chicken Caesar Salad Bowl', 8.30, 'Salads', 0, 10),
('Falafel Salad Bowl (GF)', 8.30, 'Salads', 1, 6),

-- 3. PASTRIES
('Sausage Roll', 5.00, 'Pastries', 0, 25),
('Sausage Roll King', 6.60, 'Pastries', 0, 20),
('Meat Pie Beef', 6.50, 'Pastries', 0, 25),
('Pepper Steak Pie', 6.70, 'Pastries', 0, 15),
('Spinach & Ricotta Roll', 6.90, 'Pastries', 1, 15),
('Potato Pie Beef', 7.20, 'Pastries', 0, 12),

-- 4. BURGERS
('Chicken Burger (Lettuce & Mayo)', 6.40, 'Burgers', 0, 25),
('Beef & Cheese Burger (Tomato Sauce)', 7.10, 'Burgers', 0, 20),
('Aussie Burger (Beef, Veg, BBQ Sauce)', 7.10, 'Burgers', 0, 15),
('Vege Burger (Falafels, Salad, Aioli)', 7.10, 'Burgers', 1, 12),
('Hot & Spicy Chicken Stacker Burger', 8.50, 'Burgers', 0, 18),

-- 5. HOT BITES & TOASTED ROLLS
('Garlic Bread Loaf', 3.50, 'Hot Bites', 1, 15),
('Chicken Nuggets (x6)', 6.30, 'Hot Bites', 0, 30),
('Hot Dog (Tomato or BBQ Sauce)', 4.90, 'Hot Bites', 0, 20),
('Potato Wedges Bowl', 5.70, 'Hot Bites', 1, 25),
('Cup Of Noodles (Chicken/Beef/Mio Goreng)', 4.40, 'Hot Bites', 0, 40),
('Doner Kebab Meat & Cheese', 8.50, 'Hot Bites', 0, 15),
('Doner Kebab Meat & Salad', 9.50, 'Hot Bites', 0, 15),

-- 6. RICE & PASTA
('Butter Chicken & Rice (GF)', 8.10, 'Rice & Pasta', 0, 15),
('Bolognese Pasta (Beef Sauce)', 8.10, 'Rice & Pasta', 0, 15),
('Fettucine Carbonara Chicken', 8.10, 'Rice & Pasta', 0, 15),
('Fried Rice (GF)', 8.10, 'Rice & Pasta', 1, 12),
('Homemade Lasagna Large', 8.80, 'Rice & Pasta', 0, 10),

-- 7. SNACKS
('Popcorn (GF)', 1.70, 'Snacks', 1, 30),
('Jelly Bowl (GF)', 1.70, 'Snacks', 1, 20),
('Chocolate Mousse (GF)', 3.20, 'Snacks', 1, 15),
('Homemade Muffin', 3.60, 'Snacks', 1, 15),
('Banana Bread Slice', 3.20, 'Snacks', 1, 15),

-- 8. DRINKS
('Popper Juice', 2.90, 'Drinks', 1, 50),
('Bottled Water', 3.10, 'Drinks', 1, 60),
('Oak Milk Regular', 3.80, 'Drinks', 0, 40),
('Oak Milk Large', 5.80, 'Drinks', 0, 30),
('Ice Break Coffee', 6.90, 'Drinks', 0, 25),
('Up N Go', 4.20, 'Drinks', 0, 35),
('Soft Drink Can No Sugar', 3.70, 'Drinks', 1, 40);
