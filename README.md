🚀 Smart Task Manager

A full-stack productivity web application that helps users efficiently manage daily tasks, track progress, and receive intelligent recommendations for better productivity.

Built with a modern frontend and a secure Django REST backend, Smart Task Manager demonstrates real-world software engineering practices including authentication, API integration, and deployment.



🌐 Live Demo

👉Experience the platform here:
https://smart-task-manger-7oec.onrender.com

👉 Swagger Documentation:
https://smart-task-manger.onrender.com/swagger/


📌 Project Overview

Smart Task Manager allows users to:

✅ Create and manage tasks
✅ Mark tasks as completed
✅ Delete tasks
✅ Receive smart productivity recommendations
✅ Securely authenticate using JWT
✅ Access a responsive dashboard
✅ Work with a deployed cloud backend

This project simulates a real-world SaaS productivity tool.




🧠 Why I Built This Project

As a Software Engineering student passionate about full-stack development, I built this project to strengthen my skills in:

Frontend–Backend integration

REST API design

Authentication systems

Deployment workflows

Debugging production issues

Writing clean, maintainable code



---

🛠️ Tech Stack

🔹 Frontend

HTML5

CSS3

Vanilla JavaScript

Responsive Design


🔹 Backend

Django

Django REST Framework

Simple JWT Authentication


🔹 Database

SQLite (development)

PostgreSQL-ready for production


🔹 Deployment

Render (Backend + Frontend)


🔹 Version Control

Git + GitHub




🔐 Authentication Flow

The application uses JWT (JSON Web Token) authentication:

1. User signs up


2. Logs in


3. Receives an access token


4. Token is stored in localStorage


5. Authorized requests include the token in headers



This ensures secure communication with protected endpoints.


⚙️ Installation (Run Locally)

1️⃣ Clone the repository

git clone https://github.com/hermela-an/smart-task-manger-Fullproject.git
cd smart-task-manger-Fullproject




2️⃣ Backend Setup

cd backend
python -m venv venv
venv\Scripts\activate     # Windows

pip install -r requirements.txt

Run migrations:

python manage.py migrate

Start server:

python manage.py runserver




3️⃣ Frontend Setup

Simply open:

frontend/signup.html

Or use VS Code Live Server.




🔥 Key Features

✅ Task Management

Add tasks

Update status

Delete tasks

View all tasks





✅ Smart Recommendation System

Provides motivational feedback when tasks are completed, improving user engagement.

Example:

> "You are almost done — keep going!"






✅ Secure API

Protected routes ensure only authenticated users can manage tasks.




✅ Production Deployment

Both frontend and backend are deployed — demonstrating real-world project readiness.




💡 Future Improvements

Planned enhancements include:

📧 Email notifications for due tasks

⏰ Deadline reminders

📊 Task analytics dashboard

🧠 AI-powered recommendations

📱 Mobile-friendly UI upgrades

🐳 Docker containerization





🎯 What This Project Demonstrates

This project highlights my ability to:

✅ Build a full-stack application from scratch
✅ Design RESTful APIs
✅ Implement authentication
✅ Debug deployment issues
✅ Manage Git repositories professionally
✅ Structure scalable projects


⭐️ If You Like This Project

Give it a ⭐️ on GitHub — it helps others discover my work!

