# Identity Reconciliation API

This project implements an **Identity Reconciliation System** using **Node.js**, **Express**, and **PostgreSQL**. It allows linking contacts based on email and phone number and manages **primary** and **secondary contacts**.

---
Live Link-[https://identity-reconcillation-1-buyd.onrender.com]
## Table of Contents

- [Features]
- [Tech Stack]
- [Getting Started]
  - [Prerequisites] 
  - [Installation]
  - [Environment Variables]
  - [Database Migrations]
  - [Running Locally]
- [API Endpoints]
- [Deployment]
- [Folder Structure]
- [Contributing]
- [License]

---
## Features

- Add a new contact with **email** and **phone number**.  
- Automatically link contacts as **primary** or **secondary** based on existing records.  
- Maintain **history and linkage** between contacts.  
- RESTful API design with JSON responses.  

---
## Tech Stack

- **Backend:** Node.js, Express  
- **Database:** PostgreSQL  
- **Migrations:** node-pg-migrate  
- **Environment Management:** dotenv  
- **Development Tools:** nodemon  

---
## Getting Started

### Prerequisites

- Node.js v18+  
- PostgreSQL (local or cloud)  
- npm  

---
### Installation

```bash
# Clone the repository
git clone https://github.com/vijaysingh8/identity_reconcillation
cd identity-reconciliation

# Install dependencies
npm install

#### Environment Variables

Create a .env file in the root directory:
PORT=3000
DATABASE_URL=postgres://<user>:<password>@<host>:<port>/<database>

Use local PostgreSQL URL for development.
Use cloud PostgreSQL URL (Render) for production.
Database Migrations

This project uses node-pg-migrate to manage database tables.
# Run all migrations
npm run migrate
This will create the contacts table in your database.

Running Locally
# Start server in development mode
npm run dev
Server will run at: http://localhost:3000


### API Endpoints
Identify Contact
POST /identify

Request Body:
{
  "email": "example@test.com",
  "phoneNumber": "9999999999"
}
Response:
{
  "contact": {
    "primaryContactId": 1,
    "emails": ["example@test.com"],
    "phoneNumbers": ["9999999999"],
    "secondaryContactIds": []
  }
}

### Deployment

To deploy on Render:
Push code to GitHub.
Create a new Web Service on Render.
Set Build Command: npm install
Set Start Command: npm start
Add environment variables (DATABASE_URL, PORT).
Deploy the service.
For production, ensure your DATABASE_URL points to the internal URL of the managed database.

### Folder Structure
identity-reconciliation/
├─ migrations/           # Database migration files
├─ services/             # Business logic (contact service)
├─ routes/               # API route definitions
├─ config/               # Database connection
├─ server.js             # Entry point
├─ package.json
├─ .env
└─ README.md

### Contributing
Fork the repository
Create a branch (git checkout -b feature-name)
Commit your changes (git commit -m "Message")
Push to branch (git push origin feature-name)
Open a pull request

### License
MIT License

