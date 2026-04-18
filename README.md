# BloodLine - Final Year Project Setup Guide

This project is a MERN-stack application (MongoDB, Express, React, Node.js) for blood donation management.

## Prerequisites

To run this project, you will need the following installed on your laptop:

1.  **Node.js** (v18.x or higher recommended)
2.  **MongoDB** (running locally on port 27017 or a MongoDB Atlas connection string)
3.  **npm** (comes with Node.js)

## Getting Started

Follow these steps to get the project running:

### 1. Install Dependencies
Open your terminal (Command Prompt, PowerShell, or Bash) and run the following commands:

**For the Server:**
```bash
cd server
npm install
```

**For the Client:**
```bash
cd client
npm install
```

### 2. Environment Configuration
The project includes the original `.env` files for your convenience. If you need to change any settings (like the database URL or API keys), you can modify the `.env` files in both the `server/` and `client/` directories.

### 3. Initialize the Database (Seeding)
To populate the database with initial data (Admin and Hospitals), run the following in the `server` directory:
```bash
npm run seed
```

### 4. Run the Application

**Start the Server:**
In the `server` directory, run:
```bash
npm run dev
```
The backend should now be running on `http://localhost:5000`.

**Start the Frontend:**
In a separate terminal, go to the `client` directory and run:
```bash
npm run dev
```
The frontend should now be running on `http://localhost:3000`.

---
## Portability Check
If you are unsure about your environment setup, you can run the `PORTABILITY_CHECK.ps1` script (PowerShell) located in the root directory to verify if your system has Node.js and MongoDB reachable.
