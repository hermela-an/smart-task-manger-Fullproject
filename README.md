🚀 Smart Task Manager

A full-stack productivity web application that helps users efficiently manage daily tasks, track progress, and receive intelligent recommendations for better productivity.

🚀 Key Features
✅ Secure Authentication: JWT Token system with protected routes.
✅ Dashboard: Comprehensive overview of task statistics.
✅ Task Management (CRUD): Create, Read, Update, and Delete tasks with ease.
✅ Smart Recommendations: Priority-based task suggestions considering due dates.
✅ Email Reminders: Automated management command to notify users of tasks due tomorrow.
✅ Environment Security: Sensitive data protected via .env files.


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

📸 Project Screenshots

Signup page
<img width="1804" height="967" alt="image" src="https://github.com/user-attachments/assets/07712e34-1498-4fa1-a242-c99c7caf7418" />

Login page

<img width="1857" height="1017" alt="image" src="https://github.com/user-attachments/assets/ec688c27-7ea9-4b08-bf84-6b2fa9485c02" />

Dashbord page
<img width="1883" height="1019" alt="image" src="https://github.com/user-attachments/assets/d70b2038-c68c-4a40-8ecf-a4e4ba3f657a" />

Add Task
<img width="1656" height="977" alt="image" src="https://github.com/user-attachments/assets/73f82126-9a63-4ce8-820b-e4d88cd5f460" />



⭐️ If You Like This Project

Give it a ⭐️ on GitHub — it helps others discover my work!

