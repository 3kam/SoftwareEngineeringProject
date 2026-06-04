from flask import Blueprint

auth_bp = Blueprint('orders', __name__)

@auth_bp.route('/checkout')
def login():
    return "Checkout Page"