# 📝 TaskFlow - Collaborative Task Management Platform

## 📌 Description
TaskFlow is a collaborative task management platform that allows users to create, assign, and manage tasks in real-time.

---

## 🚀 Technologies Used

### **Frontend**
- React with TypeScript  
- CSS (without Tailwind CSS, as per user preference)  
- Axios for API consumption  
- Vite as the development environment  

### **Backend**
- Node.js with Express.js  
- PostgreSQL with Prisma ORM  
- JWT for authentication  
- bcryptjs for password encryption  
- WebSockets (for future real-time updates)  

---

## 🏗️ **Project Setup**

### **1️⃣ Backend**
#### 📌 Installation and Setup
```bash
cd backend
npm install
```
#### 📌 Configure Prisma and PostgreSQL
1. Create a `.env` file in the `backend` folder:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/taskflow"
JWT_SECRET="secret"
```
2. Run migrations:
```bash
npx prisma migrate dev --name init
```

#### 📌 Start the Server
```bash
node server.js
```

### **2️⃣ Frontend**
#### 📌 Installation and Setup
```bash
cd frontend
npm install
```

#### 📌 Start the Frontend
```bash
npm run dev
```

---

## 🔐 **Authentication with JWT**

### **Endpoints**

#### 🔹 User Registration
- **Route:** `POST /api/signup`
- **Body:**
```json
{
  "name": "Example User",
  "email": "user@example.com",
  "password": "123456"
}
```

#### 🔹 User Login
- **Route:** `POST /api/login`
- **Body:**
```json
{
  "email": "user@example.com",
  "password": "123456"
}
```
- **Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 🔹 Protected Route (Example)
- **Route:** `GET /api/protected`
- **Headers:**
```json
{
  "Authorization": "Bearer YOUR_TOKEN_HERE"
}
```
- **Expected Response:**
```json
{
  "message": "Access granted",
  "userId": "123456"
}
```

---

##  **Next Steps**
1. Implement CRUD for Boards and Tasks.  
2. Integrate authentication in the frontend.  
3. Implement WebSockets for real-time updates.  
4. Deploy the application on Vercel (frontend) and Railway/Render (backend).  



