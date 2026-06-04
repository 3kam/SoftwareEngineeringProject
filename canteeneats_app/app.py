from flask import Flask, render_template, request, redirect, url_for, jsonify
import sqlite3
import json

app = Flask(__name__)

# Point directly to your existing database path folder
DB_PATH = '.database/database.db'

def query_db(query, args=(), one=False):
    """Helper function to cleanly fetch data records from SQLite."""
    with sqlite3.connect(DB_PATH) as conn:
        conn.row_factory = sqlite3.Row
        cur = conn.cursor().execute(query, args)
        rv = cur.fetchall()
        return (rv if rv else None) if one else rv

@app.route('/')
def home():
    """Redirect a blank home address straight to your student menu view."""
    return redirect(url_for('client_portal'))

@app.route('/client')
def client_portal():
    """Renders the student side layout with real items from the menu database."""
    # Simulating logged in user 1 (student1@smshs.com)
    user_record = query_db("SELECT prepaid_balance FROM Users WHERE user_id = 1", one=True)
    
    # Fallback default values if database tables are empty
    current_balance = user_record['prepaid_balance'] if user_record else 25.00
    
    menu_items = query_db("SELECT * FROM CanteenItems") or []
    user_orders = query_db("""
        SELECT Orders.*, CanteenItems.item_name FROM Orders 
        JOIN CanteenItems ON Orders.item_id = CanteenItems.item_id 
        WHERE Orders.user_id = 1 ORDER BY Orders.order_id DESC
    """) or []
    
    return render_template('client.html', 
                           current_user_balance=current_balance, 
                           menu_items=menu_items, 
                           user_orders=user_orders)

@app.route('/submit-order', methods=['POST'])
def process_incoming_order():
    """Processes incoming shopping baskets, checkouts, and drops funds dynamically."""
    user_id = 1 
    pickup_period = request.form.get('pickup_period')
    cart_json = request.form.get('cart_json_data')
    
    if not cart_json:
        return redirect(url_for('client_portal'))
        
    cart_items = json.loads(cart_json)
    
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        for item in cart_items:
            # Query standard item prices and available balance boundaries
            db_item = cursor.execute("SELECT price, stock_level FROM CanteenItems WHERE item_id = ?", (item['id'],)).fetchone()
            user_bal = cursor.execute("SELECT prepaid_balance FROM Users WHERE user_id = ?", (user_id,)).fetchone()
            
            if not db_item or not user_bal:
                return "Error processing transactional lookup.", 400
                
            total_cost = db_item[0] * item['quantity']
            
            # Atomic algorithmic validation checks mapping to design documentation rules
            if db_item[1] < item['quantity'] or user_bal[0] < total_cost:
                return "Transaction rejected: Out of stock or insufficient credit.", 400
                
            # Perform clean runtime state updates
            cursor.execute("UPDATE CanteenItems SET stock_level = stock_level - ? WHERE item_id = ?", (item['quantity'], item['id']))
            cursor.execute("UPDATE Users SET prepaid_balance = prepaid_balance - ? WHERE user_id = ?", (total_cost, user_id))
            cursor.execute("INSERT INTO Orders (user_id, item_id, quantity, target_period, status) VALUES (?, ?, ?, ?, 'Received')",
                           (user_id, item['id'], item['quantity'], pickup_period))
        conn.commit()
        
    return redirect(url_for('client_portal'))

@app.route('/staff')
def staff_dashboard():
    """Renders the active preparation queues for kitchen staff views."""
    active_orders = query_db("""
        SELECT Orders.*, CanteenItems.item_name FROM Orders 
        JOIN CanteenItems ON Orders.item_id = CanteenItems.item_id 
        WHERE Orders.status != 'Collected' ORDER BY Orders.order_id ASC
    """) or []
    return render_template('staff.html', active_orders=active_orders, current_user_balance=0.00)

@app.route('/update-status/<int:order_id>', methods=['POST'])
def mutate_status(order_id):
    """Advances states along processing pathways (Received -> Preparing -> Ready)."""
    next_status = request.form.get('next_status')
    with sqlite3.connect(DB_PATH) as conn:
        conn.cursor().execute("UPDATE Orders SET status = ? WHERE order_id = ?", (next_status, order_id))
        conn.commit()
    return redirect(url_for('staff_dashboard'))

if __name__ == '__main__':
    # Launch application development server instance locally on port 5000
    app.run(host='0.0.0.0', port=5000, debug=True)
