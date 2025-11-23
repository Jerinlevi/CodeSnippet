📘 Code Snippet Manager – Full-Stack Project

A full-stack application that allows users to save, edit, delete, and manage code snippets.
The project includes user authentication, protected routes, and CRUD operations for snippets.

This application is built using:
	•	Frontend: React + Vite
	•	Backend: Node.js + Express
	•	Database: SQLite
	•	Authentication: JWT

⸻

🧠 Features

🔐 Authentication
	•	User Registration
	•	User Login
	•	JWT-based Protected Routes
	•	Logout

🧾 Snippet Management
	•	Add new code snippets
	•	Edit existing snippets
	•	Delete snippets
	•	View all snippets
	•	Snippets include:
	•	Title
	•	Language
	•	Code
	•	Tags

🖥️ Frontend
	•	Built with React + Vite
	•	React Router for navigation
	•	Context API for authentication state
	•	Fetch API for backend calls
	•	Protected routes (cannot access snippets without login)

🗃️ Backend
	•	Node.js + Express server
	•	SQLite database
	•	RESTful API:
	•	POST /register
	•	POST /login
	•	GET /snippets
	•	POST /snippets
	•	GET /snippets/:id
	•	PUT /snippets/:id
	•	DELETE /snippets/:id
	•	Middleware:
	•	JWT authentication middleware
	•	Error handling middleware

⸻

⚙️ Tech Stack

Frontend
	•	React
	•	Vite
	•	React Router
	•	Fetch API
	•	Context API (for auth)

Backend
	•	Node.js
	•	Express.js
	•	SQLite3
	•	JWT
	•	bcrypt

