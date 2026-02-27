**🚀 Full Stack Demo Application**

A structured full-stack web application demonstrating frontend-backend integration, authentication handling, and REST API architecture.

This project is divided into three core modules:

**1. Frontend – fullstack-demo**

Built using Angular, the frontend application provides a clean and responsive user interface.

Key Features:
Authentication (Login & Signup)
Role-based Dashboard (Logged-in & Guest views)
User Management (List & Detail View)
Logged In User Profile Section
About Us 
Contact Us pages

API integration with backend services
The frontend is designed with modular architecture and clean component structure to demonstrate scalable application development.

**2. Backend – full-stack-demo-backend**

Built using Node.js and Express, this backend provides RESTful APIs consumed by the frontend.

Highlights:
Authentication APIs
User CRUD operations
Structured controller architecture
File system-based data persistence (No external database)
Data is stored and retrieved using JSON files to keep the project lightweight and focused on architecture demonstration.

**3. API Collection – Full Stack Demo.postman_collection.json**

Includes a complete Postman collection for:

Testing all backend APIs
Understanding request/response structures
Quick API validation during development

**Tech Stack**

Angular - 18.2.21
Node - 20.19.6
Express.js - 4.16

**Project Setup & Running Instructions**

git clone https://github.com/YOUR_USERNAME/full-stack-demo.git

For Frontend
  - cd full-stack-demo 
  - npm install
  - npm start
It will run on - http://localhost:4200

For Backend
  - cd full-stack-demo-backend
  - npm install
  - npm start

It will run on http://localhost:3000