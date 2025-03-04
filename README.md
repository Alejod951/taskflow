📝 TaskFlow - Collaborative Task Management Platform

📌 Description

TaskFlow is a collaborative task management platform that allows users to create, assign, and manage tasks in real-time.

🚀 Technologies Used

Frontend

React with TypeScript

CSS (without Tailwind CSS, as per user preference)

Axios for API consumption

Vite as the development environment

Backend

Node.js with Express.js

PostgreSQL with Prisma ORM

JWT for authentication

bcryptjs for password encryption

WebSockets (for future real-time updates)

🏗️ Project Setup

1️⃣ Backend

📌 Installation and Setup

cd backend
npm install

📌 Configure Prisma and PostgreSQL

Create a .env file in the backend folder:

DATABASE_URL="postgresql://user:password@localhost:5432/taskflow"
JWT_SECRET="secret"

Run migrations:

npx prisma migrate dev --name init

📌 Start the Server

node server.js

2️⃣ Frontend

📌 Installation and Setup

cd frontend
npm install

📌 Start the Frontend

npm run dev

🔐 Authentication with JWT

Endpoints

🔹 User Registration

Route: POST /api/signup

Body:

{
  "name": "Example User",
  "email": "user@example.com",
  "password": "123456"
}

🔹 User Login

Route: POST /api/login

Body:

{
  "email": "user@example.com",
  "password": "123456"
}

Response:

{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

🔹 Protected Route (Example)

Route: GET /api/protected

Headers:

{
  "Authorization": "Bearer YOUR_TOKEN_HERE"
}

Expected Response:

{
  "message": "Access granted",
  "userId": "123456"
}

 Next Steps

Implement CRUD for Boards and Tasks.

Integrate authentication in the frontend.

Implement WebSockets for real-time updates.

Deploy the application on Vercel (frontend) and Railway/Render (backend).

💡 Any questions or improvements? Let's keep iterating. 🚀

