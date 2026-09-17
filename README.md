# 🎓 Smart Student Dashboard

A modern and responsive **Student Productivity Dashboard** built with **React, Tailwind CSS, Node.js, Express.js, and MongoDB**.

The application helps students manage their academic life in one place — from tasks and study sessions to goals, CGPA tracking, and useful learning resources.

---

## 🌐 Live Demo

🔗 https://smart-student-dashboard-six.vercel.app/

---

## ✨ Features

### 📊 Dashboard
- Overview of tasks, study hours, and current CGPA
- Quick view of pending tasks
- Study statistics
- Monthly calendar widget
- Responsive dashboard layout

### 🔐 Authentication
- User registration and login
- JWT-based authentication
- Protected dashboard routes
- Persistent login using authentication tokens
- Secure password hashing

### ✅ Task Management
- Add, edit, and delete tasks
- Set task priority (High, Medium, Low)
- Mark tasks as completed
- Filter by All, Pending, and Completed
- User-specific tasks
- Persistent database storage

### 🎯 Goal Tracker
- Add weekly and monthly goals
- Set goal targets
- Track goal progress
- Mark goals as completed
- Delete goals
- User-specific goal data

### 📚 Study Tracker
- Log study sessions
- Record subject and study duration
- View study sessions by date
- Track study activity
- Delete study sessions
- Persistent database storage

### 🎓 CGPA Calculator
- Add semester SGPA and credits
- Automatically calculate current CGPA
- Track total credits
- Delete semester records
- User-specific semester data

### 📅 Calendar
- Full-year calendar view
- Monthly calendar widget
- Year navigation

### 📖 Resources
- Save useful learning resources
- Display website domain for cleaner UI
- Open resources directly
- Delete saved resources
- User-specific resources

### 📱 Responsive Design
- Mobile-friendly interface
- Responsive sidebar drawer
- Desktop, tablet, and mobile support

---

## 🛠️ Tech Stack

### Frontend

- React
- React Router DOM
- Tailwind CSS
- Vite
- Lucide React Icons
- React Icons

### Backend

- Node.js
- Express.js
- JWT
- bcrypt
- Mongoose

### Database

- MongoDB
- MongoDB Atlas

### Deployment

- Vercel — Frontend
- Render — Backend
- MongoDB Atlas — Database

---

## 🏗️ Architecture

                 ┌─────────────────────┐
                 │      React App      │
                 │     Tailwind CSS    │
                 │       Vercel        │
                 └──────────┬──────────┘
                            │
                         REST API
                            │
                            ▼
                 ┌─────────────────────┐
                 │   Express.js API    │
                 │      Node.js        │
                 │       Render        │
                 └──────────┬──────────┘
                            │
                         Mongoose
                            │
                            ▼
                 ┌─────────────────────┐
                 │    MongoDB Atlas    │
                 └─────────────────────┘

## 📂 Project Structure
```text

smart-student-dashboard/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── goalController.js
│   │   ├── resourceController.js
│   │   ├── semesterController.js
│   │   ├── studySessionController.js
│   │   └── taskController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── Goal.js
│   │   ├── Resource.js
│   │   ├── Semester.js
│   │   ├── StudySession.js
│   │   ├── Task.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── goalRoutes.js
│   │   ├── resourceRoutes.js
│   │   ├── semesterRoutes.js
│   │   ├── studySessionRoutes.js
│   │   └── taskRoutes.js
│   │
│   ├── package.json
│   └── server.js
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── layout/
│   ├── pages/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
│
├── .gitignore
├── package.json
└── README.md

```


## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/diansade/smart-student-dashboard.git
```

### 2. Navigate to the project

```bash
cd smart-student-dashboard
```

### 3. Install frontend dependencies

```bash
npm install
```

### 4. Install backend dependencies

```bash
cd backend
npm install
```

### 5. Configure environment variables

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

For the frontend, create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:5000
```

### 6. Start the backend

From the `backend` directory:

```bash
npm run dev
```

### 7. Start the frontend

Open another terminal in the project root:

```bash
npm run dev
```

The application will now be available locally.

---

## 🔌 API Routes

### Authentication

```text
POST   /api/auth/register
POST   /api/auth/login
```

### Tasks

```text
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

### Goals

```text
GET    /api/goals
POST   /api/goals
PUT    /api/goals/:id
DELETE /api/goals/:id
```

### Study Sessions

```text
GET    /api/study-sessions
POST   /api/study-sessions
DELETE /api/study-sessions/:id
```

### Semesters

```text
GET    /api/semesters
POST   /api/semesters
DELETE /api/semesters/:id
```

### Resources

```text
GET    /api/resources
POST   /api/resources
DELETE /api/resources/:id
```

All student data routes are protected using JWT authentication.

---

## 🔒 Data & Authentication

The application uses:

* **JWT** for user authentication
* **bcrypt** for password hashing
* **MongoDB Atlas** for persistent data storage
* User-specific database queries to keep data separated
* Environment variables for sensitive configuration

Authentication tokens are stored on the client and sent with API requests using the `Authorization` header.

---

## 🚀 Deployment

The application is deployed using:

| Service       | Purpose                   |
| ------------- | ------------------------- |
| Vercel        | React frontend            |
| Render        | Node.js / Express backend |
| MongoDB Atlas | Database                  |

### Production API

```text
https://smart-student-dashboard-ylh7.onrender.com
```

The production frontend uses the `VITE_API_URL` environment variable to communicate with the deployed backend.

---

## 🎯 Current Status

### ✅ Full-Stack Version Completed

Implemented:

* Responsive React frontend
* User authentication
* JWT authorization
* Task management
* Goal tracking
* Study session tracking
* CGPA calculator
* Calendar
* Learning resources
* MongoDB persistence
* Express REST API
* Protected API routes
* Vercel deployment
* Render deployment
* MongoDB Atlas integration

---

## 🚀 Future Improvements

* Dark mode
* Notifications and reminders
* Search functionality
* Analytics and charts
* More detailed study statistics
* Improved dashboard personalization
* Performance optimization

---

## 📸 Screenshots

<img width="1912" height="935" alt="Dashboard" src="https://github.com/user-attachments/assets/c77d890c-d792-4d0e-a68f-9816c44930e9" />

<img width="1906" height="928" alt="Tasks" src="https://github.com/user-attachments/assets/33c5bfaf-b4cd-4f5b-8bef-152850425cfe" />

<img width="1892" height="923" alt="Study Tracker" src="https://github.com/user-attachments/assets/df3689eb-1f26-40e5-8e79-3f3c90b2736a" />

<img width="1892" height="922" alt="CGPA Calculator" src="https://github.com/user-attachments/assets/cc08a33b-91fb-43c7-bda6-6db918425cfe" />

<img width="1865" height="925" alt="Resources" src="https://github.com/user-attachments/assets/3e398c6b-7317-4472-851f-9016da69c4d8" />

---

## 📄 License

This project is open source and available under the MIT License.

```
```
