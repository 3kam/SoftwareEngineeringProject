# CanteenEats – SMSHS Canteen Ordering System

---

## Project Overview
CanteenEats is a Flask-based Progressive Web Application (PWA) designed to optimise the ordering process at St Marys Senior High School (SMSHS). The system removes physical queue congestion by enabling students to pre-order meals, manage prepaid credit, and track order status in real time.

---

## Problem Definition
The SMSHS canteen services over 800 students daily, resulting in:
- Long queue times during recess and lunch  
- Inefficient order management for staff  
- Reduced eating time for students  

This system addresses these issues through automation and real-time tracking.

---

## Objectives
- Reduce physical queue congestion  
- Provide real-time order tracking  
- Improve staff workflow efficiency  
- Implement secure prepaid account management  

---

## Target Users
- **Students** – Place and track orders  
- **Staff** – Manage menu and orders  
- **Admin** – Manage users and system configuration  

---

## Core Features

### Student Features
- Browse live menu with filters (price, dietary requirements, availability)  
- Place orders using prepaid credit  
- Select pickup time (Recess or Lunch)  
- Track order status (Received → Preparing → Ready)  
- View order history  
- Manage account details  

### Staff Features
- Add, edit, and delete menu items (including images)  
- View and update order statuses  
- Cancel orders and issue refunds  
- Promote users to staff roles  
- Top up student credit  
- Access dashboard with active orders  

---

## System Architecture

### Input–Process–Output Model

**Input**
- User login credentials  
- Menu selections  
- Filter preferences  
- Payment authorisation  

**Process**
- Role-based authentication (RBAC)  
- Balance validation  
- Order verification and stock checks  
- Database updates  

**Output**
- Order confirmation  
- Updated account balance  
- Real-time order status  
- Staff preparation queue  

---

## Technical Stack
- **Backend:** Flask (Python)  
- **Database:** SQLite (SQL)  
- **Frontend:** HTML, CSS, JavaScript  
- **Version Control:** Git  

### Security
- Password hashing  
- CSRF protection  
- Session management  

---

## Non-Functional Requirements
- **Security:** Prevent unauthorised access and data breaches  
- **Performance:** Handle concurrent users during peak times  
- **Usability:** Fast and intuitive interface  
- **Reliability:** Stable operation during school hours  

---

## Installation

```bash
pip install -r requirements.txt
python init_db.py
flask run
