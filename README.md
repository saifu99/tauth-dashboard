# MERN Authentication Dashboard

A full-stack **MERN Authentication and Task Management Dashboard** built with a focus on **security, scalability, and clean architecture**.  
This project demonstrates real-world **JWT-based authentication**, **protected routes**, and **frontend–backend integration**.

---

## Features

### Authentication
- User registration and login
- JWT-based authentication
- Password hashing using bcrypt
- Protected frontend and backend routes

### Dashboard & Tasks
- Display logged-in user profile
- Create, read, update, delete tasks (CRUD)
- Mark tasks as completed
- Search and filter tasks
- Secure logout

### Security & Scalability
- Hashed passwords (bcrypt)
- JWT verification middleware
- Authorization required for protected APIs
- Centralized error handling
- Modular backend architecture

---

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, React Router DOM
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose, MongoDB Atlas)
- **Authentication:** JWT, bcryptjs
- **Tools:** Postman, Git & GitHub

---

## Project Structure

```bash
mern-auth-dashboard/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
│
└── README.md


## Environment Variables

Create a .env file inside the backend directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

## Setup Instructions

▶️ Run the Project Locally
1. Clone the repository
git clone https://github.com/saifu99/mern-auth-dashboard.git
cd mern-auth-dashboard

2. Backend Setup
cd backend
npm install
cp .env.example .env   # add MongoDB URI and JWT_SECRET
npm run dev

Backend runs at:
http://localhost:5000

3. Frontend Setup
cd ../frontend
npm install
npm run dev

Frontend runs at:
http://localhost:5173


## Postman / API Testing

A Postman collection is included in the repo (`MERN-Auth-Dashboard.postman_collection.json`) containing all backend endpoints:

- **Auth**
  - POST `/api/auth/register` – Register a new user
  - POST `/api/auth/login` – Login and receive JWT
  - POST `/api/auth/logout` – Logout

- **Tasks (Protected)**
  - GET `/api/tasks` – List all tasks for logged-in user
  - POST `/api/tasks` – Create a new task
  - PUT `/api/tasks/:id` – Update a task
  - DELETE `/api/tasks/:id` – Delete a task

> To test protected endpoints, include the JWT token in the `Authorization` header:  
> `Authorization: Bearer <your_token_here>`

You can run the backend locally (`npm run dev` in `backend`) and use this collection to verify all endpoints.

---

## Scaling Frontend-Backend for Production

Even without deployment, this is the recommended production setup:

1. **Environment Variables:** Use `.env` for sensitive data (DB URI, JWT_SECRET).  
2. **Frontend Deployment:** Host React app on **Vercel/Netlify**.  
3. **Backend Deployment:** Host Node.js API on **Render/Heroku** or any cloud server with HTTPS.  
4. **Security:**  
   - Use HTTPS for API calls  
   - Implement refresh tokens and session expiration  
   - Centralized error handling and input validation  
5. **Code Architecture:**  
   - Keep backend modular: separate routes, controllers, models, middleware  
   - Frontend: use context for auth, protected routes, and component-level state management  
6. **Scalability Potential:**  
   - Backend: Add roles, pagination, caching, or microservices  
   - Frontend: Lazy load components, optimize bundle size, and handle token refresh seamlessly

