# blog_App

A full-stack Blog App built with React, Node.js, Express, and MongoDB featuring user auth and CRUD functionality.

# 📝 Blog App

This is a full-stack Blog Application built using **React**, **Tailwind CSS**, and **Vite** on the frontend, and **Node.js**, **Express.js**, and **MongoDB** on the backend. It allows users to register, log in, create, edit, delete, and view blog posts with images. Authentication is handled using JWT, and images are uploaded using Multer.

---

## 🚀 Features

- User registration and login
- JWT-based authentication
- Create, edit, delete, and view blog posts
- Upload images with each post
- Responsive UI using Tailwind CSS
- REST API with Express.js
- MongoDB for database management

---

## 🛠️ Tech Stack

**Frontend:** React, Tailwind CSS, Vite  
**Backend:** Node.js, Express.js  
**Database:** MongoDB  
**Authentication:** JWT  
**Image Uploads:** Multer  
**Security:** bcrypt

---

## 📦 Installation

### Backend Setup
```bash
cd server
npm install
# Create .env file and add:
# MONGO_URI=your_mongodb_connection
# JWT_SECRET=your_secret_key
npm run dev

Frontend Setup
bash
Copy
Edit
cd client
npm install
npm run dev



🔐 .env File Example
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


Just copy and paste this into a `README.md` file at the root of your GitHub project — you're good to go 💪

Let me know if you want me to customize anything else!
