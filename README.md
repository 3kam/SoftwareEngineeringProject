# CanteenEats – SMSHS Canteen Ordering System

CanteenEats is a Node.js-based Progressive Web Application (PWA) designed to optimize the food ordering process at St Marys Senior High School (SMSHS).

---

## Authentication Credentials
For testing and verification, use the following roles:

| Role | Username | Password |
| :--- | :--- | :--- |
| **Administrator** | `admin` | `admin123` |
| **Canteen Staff** | `canteenstaff` | `staff123` |

---

## 📋 Project Overview
The SMSHS canteen services up to 800 students daily. This system removes physical queue congestion by enabling:
* **Student Pre-ordering:** Order from mobile devices.
* **Real-time Tracking:** Status updates (Received → Preparing → Ready).
* **Efficiency:** Automated staff dashboards for kitchen management.
* **Security:** Digital balance management to minimize cash handling.

---

## System Architecture
The application follows an **Input–Process–Output (IPO)** model:

* **Input:** User credentials, menu selections, and checkout authorizations.
* **Process:** Role-based access control (RBAC), stock validation, and relational database updates (SQLite).
* **Output:** Order tracking, balance updates, and kitchen preparation queues.



[Image of client server architecture with database]


---

## Technical Stack
* **Runtime:** Node.js
* **Framework:** Express (v5.x)
* **Database:** SQLite
* **Frontend:** HTML5, CSS3, JavaScript (PWA Service Workers)

---

## Installation & Deployment
To run this application locally, ensure you have [Node.js](https://nodejs.org/) installed:

```bash

# 1. Navigate to the project root
cd canteeneats_app

# 2. Install dependencies
npm install

# 3. Launch the server
node index.js
