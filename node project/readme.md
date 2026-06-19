# 🎓 Student Management System API

A simple REST API built with **Node.js**, **Express.js**, and **MongoDB** for managing student records.

## 🚀 Features

- Add new student
- Get all students
- Get student by ID
- Update student by ID
- Delete student by ID
- Custom error handling
- MongoDB database connection

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Nodemon

---

## 📂 Project Structure

```bash
StudentManagementSystem/
│
├── config/
│   └── DB.js
│
├── controller/
│   └── studentController.js
│
├── middleware/
│   └── HttpError.js
│
├── model/
│   └── studentModel.js
│
├── routes/
│   └── StudentRoutes.js
│
├── server.js
├── package.json
└── README.md
```

---

## ⚙️ Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/StudentManagementSystem.git
```

### 2️⃣ Move into Project Folder

```bash
cd StudentManagementSystem
```

### 3️⃣ Install Dependencies

```bash
npm install
```

### 4️⃣ Start MongoDB

Make sure MongoDB is running locally.

```bash
mongodb://localhost:27017/Student
```

### 5️⃣ Run Server

```bash
npm run dev
```

Server running on:

```bash
http://localhost:5000
```

---

# 📌 API Endpoints

## Base URL

```bash
http://localhost:5000/student
```

---

## ➕ Add Student

<img width="1083" height="882" alt="image" src="https://github.com/user-attachments/assets/03d4e1c2-9386-45e4-b9fa-867e0d77dbdd" />


## 📖 Get All Students

<img width="1070" height="931" alt="image" src="https://github.com/user-attachments/assets/d5733533-af02-4cb2-a4ce-6b3085fed024" />


## 🔍 Get Student By ID

<img width="1079" height="733" alt="image" src="https://github.com/user-attachments/assets/6bfde22a-3c4b-46dc-b2f3-6ccd15b6021c" />


## ✏️ Update Student

<img width="1088" height="806" alt="image" src="https://github.com/user-attachments/assets/08899c45-8925-47b3-80d2-7f3454e7354d" />


## ❌ Delete Student

<img width="1091" height="770" alt="image" src="https://github.com/user-attachments/assets/d56fa825-a11e-41be-ba30-17935d4e6f85" />


# 📚 Student Schema

```js
{
  name: String,
  GRid: Number,
  email: String,
  course: String,
  PhoneNumber: Number
}
```

---

# 🧾 Available Courses

- Fullstack Developer
- Graphic Design
- Video Editing
- UI/UX

---

# ⚠️ Error Handling

Custom error middleware handles:

- Invalid routes
- Database errors
- Validation errors
- Server errors

---

# 🧪 Testing API

You can test API using:

- Postman
- Thunder Client
- Insomnia

---

# 👨‍💻 Author

Kalpesh Goswami

---

# ⭐ Support

If you like this project, give it a ⭐ on GitHub.
