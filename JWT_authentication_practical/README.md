# 🔐 JWT Authentication Practice

A simple JWT Authentication API built using **Node.js**, **Express.js**, **MongoDB**, and **JWT (JSON Web Token)**. This project demonstrates user registration, login, protected routes, authentication middleware, and logout functionality.

---

## 🚀 Features

- ✅ User Registration
- ✅ User Login
- ✅ JWT Token Generation
- ✅ Protected Routes
- ✅ Authentication Middleware
- ✅ Logout
- ✅ Logout from All Devices
- ✅ MongoDB Database Integration
- ✅ Error Handling Middleware

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- dotenv

---

## 📁 Project Structure

```
JWT_AUTHENTICATION_PRACTICE
│
├── config
│   └── db.js
│
├── controller
│   └── userController.js
│
├── middleware
│   ├── auth.js
│   └── httpError.js
│
├── model
│   └── userModel.js
│
├── router
│   └── userRouter.js
│
├── .env
├── server.js
├── package.json
└── package-lock.json
```

---

## 📦 Installation

Clone the repository

```bash
https://github.com/kalpeshgoswami/Node.js-2/new/main/JWT_authentication_practical
```

Go to project folder

```bash
cd JWT_AUTHENTICATION_PRACTICE
```

Install dependencies

```bash
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000

MONGO_URL=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

## ▶️ Run the Project

Development

```bash
npm start
```

or

```bash
nodemon server.js
```

---

# 📌 API Endpoints

## User Registration

**POST**

<img width="1082" height="828" alt="image" src="https://github.com/user-attachments/assets/6e114df7-dc5d-419f-8ecb-45fa7563e256" />



## Login

**POST**

<img width="1098" height="929" alt="image" src="https://github.com/user-attachments/assets/2613a0ce-0229-4ab2-9792-858022dd7920" />



## Get All Users

<img width="978" height="947" alt="image" src="https://github.com/user-attachments/assets/b947a6aa-a057-42d4-b469-5f4e4d491015" />


## Protected Login

**POST**

```
/user/authlogin
```

Headers

```
Authorization: Bearer <JWT_TOKEN>
```

---

## Logout

**GET**

```
/user/logOut
```

Headers

```
Authorization: Bearer <JWT_TOKEN>
```

---

## Logout From All Devices

**GET**

```
/user/AllLogout
```

Headers

```
Authorization: Bearer <JWT_TOKEN>
```

---

## Authentication

Protected routes require JWT Token.

Example

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

---

## 📚 Packages Used

- express
- mongoose
- jsonwebtoken
- bcryptjs
- dotenv
- nodemon

---

## 👨‍💻 Author

**Kalpesh Goswami**

- GitHub: https://github.com/kalpeshgoswami
- LinkedIn: https://linkedin.com/in/kalpeshgoswami

---

## ⭐ Support

If you found this project helpful, don't forget to give it a ⭐ on GitHub.
