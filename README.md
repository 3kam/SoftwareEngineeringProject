# CanteenEats – SMSHS Canteen Ordering System
---
## Installation & Deployment

```bash
# Navigate to your application root directory
cd canteeneats_app

# Install required backend dependencies
npm install

# Launch the server instance
node index.js
---

## Project Overview
CanteenEats is a Node.js-based Progressive Web Application (PWA) built using the Express framework. It is designed to optimise the food ordering process at St Marys Senior High School (SMSHS). The system removes physical queue congestion by enabling students to pre-order meals, manage prepaid credit, and track order status in real time.

---

## Problem Definition
The SMSHS canteen services up to 800 students daily, resulting in:
- Long queue times during recess and lunch  
- Inefficient order management for staff  
- Reduced eating time for students  

This system addresses these issues through automation, digital balancing systems, and real-time order tracking.

---

## Objectives
- Reduce physical queue congestion outside the canteen windows  
- Provide transparent real-time order tracking for students  
- Improve staff kitchen workflow efficiency through digital dashboards  
- Implement secure prepaid account management to minimize cash handling  

---

## Target Users
- **Students** – Place and track personal orders  
- **Staff** – Manage menu item states and update cooking queues  
- **Admin** – Manage user accounts, balances, and system configuration  

---

## Core Features

### Student Features
- Browse live menu with filters (price, dietary requirements, availability)  
- Place orders using prepaid account credit  
- Select specific pickup windows (Recess or Lunch)  
- Track order status in real time (Received → Preparing → Ready)  
- View personal order history logs  
- Manage account security details  

### Staff Features
- Add, edit, and toggle menu items (including image paths)  
- View and update order processing statuses  
- Cancel incoming orders and issue immediate account balance refunds  
- Promote basic user accounts to staff access roles  
- Top up student prepaid credit balances manually  
- Access an active preparation dashboard  

---

## System Architecture

### Input–Process–Output Model

#### Input
- User login credentials (Username/Password matching blocks)  
- Menu selections and custom parameters  
- Filter and sorting preferences  
- Checkout and payment balance authorizations  

#### Process
- Role-based access control (RBAC) verification via session middleware  
- Credit account balance validation  
- Order verification and ingredient/stock checks  
- Relational database updates via SQL queries  

#### Output
- Live order confirmation signals  
- Dynamically updated user account balance records  
- Real-time order status tracking elements  
- Aggregated staff preparation queues  

---

## Technical Stack
- **Backend Runtime Environment:** Node.js (JavaScript)  
- **Server Framework:** Express (v5.x)  
- **Database Engine:** SQLite (Relational SQL file)  
- **Frontend Architecture:** Clean HTML, CSS, JavaScript (PWA Service Workers for offline shells)  
- **Version Control System:** Git (GitHub Codespaces cloud deployment configuration)  

### Security Layers
- Production-ready password hashing  
- Session-state isolation using explicit middleware  
- Route protection checking parameters across user role flags  

---

## Non-Functional Requirements
- **Security:** Strict data separation ensuring users cannot interact with other profiles  
- **Performance:** Fast response boundaries to support bulk connections during school bells  
- **Usability:** High-contrast layout designed for quick smartphone use while on school grounds  
- **Reliability:** Persistent local file storage handling sudden disconnections without dropping active cart state  

---

