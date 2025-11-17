# 🎬 Vidly Backend – Node.js API

A backend service for a video rental system, built while following the [Code with Mosh](https://codewithmosh.com/p/node-js) Node.js course. Built using **Node.js**, **Express**, and **MongoDB**.

> **Status**: 🚧 Work in Progress  
> ✅ Reached the **Authorization** milestone

---

## ✅ Course Progress

### Completed
- [v] Project Setup with Express  
- [v] RESTful API Design & Routing  
- [v] Environment Configuration with `config`  
- [v] MongoDB Integration with Mongoose  
- [v] Data Modeling: Genres, Customers, Movies, Rentals  
- [v] CRUD Operations with Validation (Joi)  
- [v] Route Protection using Middleware
- [v] User Registration Endpoint  
- [v] Password Hashing with bcrypt  
- [v] Authentication with JWT 

### Upcoming
- [] Custom Middleware for Error Handling    
- [] Role-Based Authorization (Admin Access)  
- [] Advanced Logging with Winston  
- [] Unit & Integration Testing  
- [] Code Refactoring & Cleanup  
- [] Deployment to Production (e.g. Heroku)  
- [] Performance Optimization & Best Practices  

---

## 🔐 Authentication Overview

- `POST /api/users` – Register a user  
- `POST /api/auth` – Login and receive JWT  
- Protected routes require `x-auth-token` header  
- Passwords are hashed and JWTs are issued for stateless auth  

---

## 🛠 Tech Stack

- **Node.js**, **Express**  
- **MongoDB**, **Mongoose**  
- **Joi**, **bcrypt**, **jsonwebtoken**  
- **Config**, **Lodash**, **Fawn**

---

## ▶️ Getting Started

```bash
git clone https://github.com/your-username/vidly.git
cd vidly
npm install
export vidly_jwtPrivateKey=yourSecretKey
npm start
