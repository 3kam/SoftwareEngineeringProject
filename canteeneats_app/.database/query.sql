-- Flush existing placeholder menu items to populate real school options
DELETE FROM CanteenItems;

-- INJECT SMSHS CANTEEN MENU DATA
INSERT INTO CanteenItems (item_name, price, category, is_vegetarian, is_gluten_free, is_everyday_items, is_occasional_items, stock_level) VALUES 

-- 1. Sandwiches
('Cheese & Tomato', 5.00, 'Sandwiches', 1, 0, 1, 0, 50),
('Ham & Cheese', 5.00, 'Sandwiches', 0, 0, 1, 0, 50),
('Ham, Cheese & Tomato', 5.60, 'Sandwiches', 0, 0, 1, 0, 50),
('Egg & Lettuce w/Mayo', 5.60, 'Sandwiches', 0, 0, 1, 0, 50),
('Curried Egg & Lettuce w/ Mayo', 5.60, 'Sandwiches', 0, 0, 1, 0, 50),
('Sweet Chilli Chicken, Lettuce & Mayo', 5.60, 'Sandwiches', 0, 0, 1, 0, 50),
('Chicken, Lettuce & Mayo', 5.60, 'Sandwiches', 0, 0, 1, 0, 50),
('Salad', 5.60, 'Sandwiches', 1, 0, 1, 0, 50),
('Chicken, Cheese & Tomato', 5.60, 'Sandwiches', 0, 0, 1, 0, 50),
('Chicken Caesar', 5.60, 'Sandwiches', 0, 0, 1, 0, 50),
('Ham & Salad', 6.00, 'Sandwiches', 0, 0, 1, 0, 50),
('Chicken & Salad', 6.00, 'Sandwiches', 0, 0, 1, 0, 50),
('Gluten Free Bread Add', 0.50, 'Sandwiches', 0, 1, 1, 0, 50),

-- 2. Wraps: half $4.00
('Sweet Chilli Chicken, Lettuce & Mayo (Wrap)', 7.80, 'Wraps', 0, 0, 1, 0, 50),
('Salad (Wrap)', 7.80, 'Wraps', 1, 0, 1, 0, 50),
('Chicken, Lettuce & Mayo (Wrap)', 7.80, 'Wraps', 0, 0, 1, 0, 50),
('Ham, Cheese, Tomato & Lettuce (Wrap)', 7.80, 'Wraps', 0, 0, 1, 0, 50),
('Chicken, Cheese, Tomato & Lettuce (Wrap)', 7.80, 'Wraps', 0, 0, 1, 0, 50),
('Avocado Salad (Wrap)', 8.30, 'Wraps', 0, 0, 1, 0, 50),
('Chicken, Avocado & Lettuce (Wrap)', 8.30, 'Wraps', 0, 0, 1, 0, 50),
('Chicken Caesar Salad (Wrap)', 8.30, 'Wraps', 0, 0, 1, 0, 50),
('Ham & Salad (Wrap)', 8.30, 'Wraps', 0, 0, 1, 0, 50),
('Chicken & Salad', 8.30, 'Warps', 0, 0, 1, 0, 50),
('Falafel w/Lettuce, Tomato & Aioli (Wrap)', 8.30, 'Wraps', 0, 0, 1, 0, 50),
('Gluten Free Wrap Add', 0.50, 'Wraps', 0, 1, 1, 0, 50),

-- 3. Drinks
('Popper Juice', 2.90, 'Drinks', 0, 0, 1, 0, 50),
('Water', 3.10, 'Drinks', 0, 0, 1, 0, 50),
('Mineral Water', 4.70, 'Drinks', 0, 0, 1, 0, 50),
('Ice Tea', 5.20, 'Drinks', 0, 0, 0, 1, 50),
('Aloe Vera', 5.20, 'Drinks', 0, 0, 0, 1, 50),
('Pump Water', 6.00, 'Drinks', 0, 0, 1, 0, 50),
('Oak Milk Regular', 3.80, 'Drinks', 0, 0, 1, 0, 50),
('Oak Milk Large', 5.80, 'Drinks', 0, 0, 1, 0, 50),
('Ice Break Coffee', 6.90, 'Drinks', 0, 0, 0, 1, 50),
('Up N Go', 4.20, 'Drinks', 0, 0, 1, 0, 50),
('Hot Chocolate', 3.60, 'Drinks', 0, 0, 1, 0, 50),
('Soft Drink Can No Sugar', 3.70, 'Drinks', 0, 0, 0, 1, 50),

-- 4. Salads (All new 25% Larger)
('Garden', 7.50, 'Salads', 1, 1, 1, 0, 50),
('Caesar V', 7.50, 'Salads', 0, 0, 1, 0, 50),
('Avocado Salad', 8.30, 'Salads', 0, 0, 1, 0, 50),
('Sweet Chilli Chicken', 7.50, 'Salads', 0, 0, 1, 0, 50),
('Chicken Caesar', 8.30, 'Salads', 0, 0, 1, 0, 50),
('Falafel Salad', 8.30, 'Salads', 1, 1, 1, 0, 50),

-- 5. Turkish Rolls
('Italian', 8.30, 'Turkish Rolls', 0, 0, 1, 0, 50),
('Schnitzel', 8.30, 'Turkish Rolls', 0, 0, 1, 0, 50),
('Sweet Chilli', 8.30, 'Turkish Rolls', 0, 0, 1, 0, 50),
('The #1', 8.30, 'Turkish Rolls', 0, 0, 1, 0, 50),
('The Classic', 8.30, 'Turkish Rolls', 0, 0, 1, 0, 50),
('Vegetarian', 8.30, 'Turkish Rolls', 0, 0, 1, 0, 50),

-- 6. Rice & Pasta
('Butter Chicken & Rice', 8.10, 'Rice & Pasta', 0, 1, 1, 0, 50), 
('Bolognese Pasta Beef Sauce', 8.10, 'Rice & Pasta', 0, 0, 1, 0, 50), 
('Fettucine Carbonara Chicken', 8.10, 'Rice & Pasta', 0, 0, 1, 0, 50), 
('Fried Rice', 8.10, 'Rice & Pasta', 1, 1, 1, 0, 50), 
('Half Butter Chicken & Rice', 5.80, 'Rice & Pasta', 0, 1, 1, 0, 50), -- Half is $5.80
('Half Bolognese Pasta Beef Sauce', 5.80, 'Rice & Pasta', 0, 0, 1, 0, 50), -- Half is $5.80
('Half Fettucine Carbonara Chicken', 5.80, 'Rice & Pasta', 0, 0, 1, 0, 50), -- Half is $5.80
('Half Fried Rice', 5.80, 'Rice & Pasta', 1, 1, 1, 0, 50), -- Half is $5.80
('Homemade Lasagna Large', 8.80, 'Rice & Pasta', 0, 0, 1, 0, 50),

-- 7. Sushi Rolls (Gluten Free)
('Tuna & Cucumber', 5.40, 'Sushi', 0, 1, 1, 0, 50), 
('Chicken & Avocado', 5.40, 'Sushi', 0, 1, 1, 0, 50),
('Vegetarian', 5.40, 'Sushi', 0, 1, 1, 0, 50),

-- 8. Breakfast (Before 9am)
('Seasonal Fruit Pieces', 2.20, 'Breakfast', 0, 0, 1, 0, 50),
('Watermelon Bowl', 6.70, 'Breakfast', 0, 0, 1, 0, 50),
('Fruit Salad Bowl', 7.30, 'Breakfast', 0, 0, 1, 0, 50),
('Homemade Muffin', 5.40, 'Breakfast', 0, 0, 0, 1, 50),
('Hash Brown', 2.30, 'Breakfast', 1, 1, 0, 1, 50),
('Cheese Toasted Wrap', 4.20, 'Breakfast', 1, 0, 1, 0, 50),
('Ham & Cheese Toasted Wrap', 5.20, 'Breakfast', 0, 0, 1, 0, 50),

-- 9. Pastries
('Sausage Roll', 5.00, 'Pastries', 0, 0, 0, 1, 50),
('Sausage Roll King', 6.60, 'Pastries', 0, 0, 0, 1, 50),
('Meat Pie Beef', 6.50, 'Pastries', 0, 0, 0, 1, 50),
('Pepper Steak Pie', 6.70, 'Pastries', 0, 0, 0, 1, 50),
('Spinach & Ricotta Roll', 6.90, 'Pastries', 1, 0, 0, 1, 50),
('Potato Pie Beef', 7.20, 'Pastries', 0, 0, 0, 1, 50),

-- 10. Snacks
('Popcorn', 1.70, 'Snacks', 0, 1, 1, 0, 50),
('Brownie', 1.70, 'Snacks', 0, 0, 0, 1, 50),
('Jelly Bowl', 3.20, 'Snacks', 0, 1, 0, 1, 50),
('Chocolate Mousse', 3.20, 'Snacks', 0, 1, 0, 1, 50),
('Banana Bread', 3.60, 'Snacks', 0, 0, 1, 0, 50),
('Piranha Rice Snaps', 3.60, 'Snacks', 0, 1, 1, 0, 50),
('Homemade Muffin', 5.40, 'Snacks', 0, 0, 1, 0, 50),
('Sour Snap Stix', 1.70, 'Snacks', 0, 1, 1 ,0, 50),
('Frozen Juice Cup', 2.40, 'Snacks', 0, 1, 1, 0, 50),
-- Extras as part of snacks
('Sauce or Dressing Portions', 0.60, 'Snacks', 0, 0, 0, 0, 50),
('Sour Cream - Gravy - Cheese', 1.10, 'Snacks', 0, 0, 0, 0, 50),
('Utensils', 0.30, 'Snacks', 0, 0, 0, 0, 50),

-- 11. Loaded Subs
('BBQ Chicken, Cheese & Sauce Sub', 6.50, 'Loaded Subs', 0, 0, 1, 0, 50),
('Pizza Sub: Salami, Chicken & Cheese', 6.50, 'Loaded Subs', 0, 0, 1, 0, 50),

-- 12. Toasted Wraps
('Sweet Chilli Chicken, Cheese & SC Mayo Wrap', 7.30, 'Toasted Wraps', 0, 0, 0, 1, 50),
('Chicken & Cheese w/BBQ Sauce Wrap', 7.30, 'Toasted Wraps', 0, 0, 0, 1, 50),

-- 13. Mexican Nachos
('Beef & Cheese Nachos', 7.20, 'Mexican Nachos', 0, 1, 0, 1, 50),
('Cheesy Sauce Nachos', 7.20, 'Mexican Nachos', 1, 1, 0, 1, 50),
('The Lot Nachos', 8.20, 'Mexican Nachos', 0, 0, 0, 1, 50),

-- 14. Hot Bites
('Spicy Chicken Wings', 2.40, 'Hot Bites', 0, 0, 1, 0, 50), -- $2.40 for each wing
('Chicken Tenders Sweet Chilli', 2.90, 'Hot Bites', 0, 0, 1, 0, 50),
('Garlic Bread Loaf', 3.50, 'Hot Bites', 1, 0, 1, 0, 50),
('Chicken Nuggets x6', 6.30, 'Hot Bites', 0, 0, 0, 1, 50),
('Chicken Nuggets x6 (GF)', 6.30, 'Hot Bites', 0, 1, 0, 1, 50),
('Hot Dog Tomato Or BBQ Sauce', 4.90, 'Hot Bites', 0, 0, 1, 0, 50),
('Potato Wedges', 5.70, 'Hot Bites', 1, 1, 0, 1, 50),
('Cup of Noodles (Tom Yum)', 4.40, 'Hot Bites', 1, 0, 0, 1, 50), -- Tom Yum
('Cup of Noodles (Beef)', 4.40, 'Hot Bites', 1, 0, 0, 1, 50), -- Beef
('Cup of Noodles (Chicken)', 4.40, 'Hot Bites', 1, 0, 0, 1, 50), -- Chicken
('Cup of Noodles (Mi Goreng)', 4.40, 'Hot Bites', 1, 0, 0, 1, 50), -- Mi Goreng


-- 15. Burgers
('Chicken Burger Lettuce & Mayo', 6.40, 'Burgers', 0, 0, 1, 0, 50),
('Beef & Cheese Burger Tomato Sauce', 7.10, 'Burgers', 0, 0, 1, 0, 50),
('Aussie Burger', 7.10, 'Burgers', 0, 0, 1, 0, 50),
('Vege Burger', 7.10, 'Burgers', 1, 0, 1, 0, 50),
('Hot & Spicy Chicken Stacker Burger', 8.50, 'Burgers', 0, 0, 1, 0, 50),

-- 16. Doner Kebabs
('Doner Kebab Meat & Cheese', 8.50, 'Doner Kebabs', 0, 0 1, 0, 50),
('Doner Kebab Meat & Salad', 9.50, 'Doner Kebabs', 0, 0, 1, 0, 50);