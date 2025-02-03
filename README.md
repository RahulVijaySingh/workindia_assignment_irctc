# WorkIndia Assignment(IRCTC)

# 🚆 Train Booking System

## 📌 Project Overview

This is a **Train Booking System API** built using **Node.js, Express, and MySQL**, featuring:
✅ **User Authentication & Role-Based Access**
✅ **Train Search & Booking**
✅ **Admin Management for Trains & Bookings**
✅ **Secure API Key Protection for Admin Routes**
✅ **Concurrency Handling to Prevent Double Bookings**

---

## **🔹 Project Setup**

### **1️⃣ Install Dependencies**

Run the following commands:

```sh
npm init -y   # Initialize Node.js project
npm install express mysql2 dotenv jsonwebtoken bcryptjs cors nodemon
or  npm i
```

### **2️⃣Database Setup**

**Copy the content of database.sql in MySQL(workbench) sheet run it**

### **3️⃣ Setup `.env` File**

Create a `.env` file in the project root and add:

```
PORT=3000
DB_HOST=localhost
DB_USER=root                 ######as per your database******
DB_PASS=your_mysql_password  ######as per your database******
DB_NAME=train_booking        ######as per you choice********
JWT_SECRET=your_jwt_secret   ######leave it as it is********
ADMIN_API_KEY=123456789rahul ###### this will be used for admin as secret api  key (x-api-key)
```

### **3️⃣ Start the Server**

```sh
node src/index.js      # Start normally
or
nodemon src/index.js   # Start with nodemon (if installed)
```

---

## **🔹 User Authentication**

### **1️⃣ User Registration**

**Endpoint:** `POST http://localhost:3000/api/auth/signup`

**Body:**

```json
{
  "name": "Rahul Vijjay Singh",
  "email": "rahul@gmail.com",
  "password": "password123",
  "role": "admin" // Role must be 'admin' or 'user'
}
```

**Response:**

```json
{
  "message": "User registered successfully"
}
```

### **2️⃣ User Login**

**Endpoint:** `POST http://localhost:3000/api/auth/login`

**Body:**

```json
{
  "email": "rahul@gmail.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "token": "your_jwt_token"
}
```

⚡ **Token is valid for 1 hour**

---

## **🔹 Train Management**

### **3️⃣ Add Train (Admin Only)**

**Endpoint:** `POST http://localhost:3000/api/trains/add`

**Headers:**

````
Authorization: Bearer YOUR_ADMIN_JWT_TOKEN
x-api-key: 123456789rahul    this should be confidential but its dummy so i am making public

**Body:**
```json
{
  "name": "New Delhi Garib Rath Express",
  "source": "Ranchi",
  "destination": "Delhi",
  "total_seats": 100
}
````

**Response:**

```json
{
  "message": "Train added successfully"
}
```

### **4️⃣ Get Trains Between Two Locations**

**Endpoint:** `GET http://localhost:3000/api/trains/search?source=CityA&destination=CityB`

**Response:**

```json
[
  {
    "id": 1,
    "name": "Express Train",
    "source": "CityA",
    "destination": "CityB",
    "total_seats": 100,
    "available_seats": 50
  }
]
```

---

## **🔹 Train Booking**

### **5️⃣ Book a Train Ticket**

**Endpoint:** `POST http://localhost:3000/api/bookings/book`

**Headers:**

```
Authorization: Bearer YOUR_USER_JWT_TOKEN
```

**Body:**

```json
{
  "user_id": 2,
  "train_id": 2
}
```

**Response:**

```json
{
  "message": "Seat booked successfully"
}
```

⚡ **Concurrency Handling Ensures No Double Bookings**

---

### **6️⃣ View User Booking History**

**Endpoint:** `GET http://localhost:3000/api/bookings/history`

**Headers:**

```
Authorization: Bearer YOUR_USER_JWT_TOKEN
```

**Response:**

```json
[
  {
    "id": 1,
    "train_name": "Express Train",
    "source": "CityA",
    "destination": "CityB",
    "booking_time": "2025-02-03 14:30:00"
  }
]
```

---

## **🔹 Admin Booking Management**

### **7️⃣ Get All Bookings (Admin Only)**

**Endpoint:** `GET http://localhost:3000/api/bookings/admin/all`

**Headers:**

```
Authorization: Bearer YOUR_ADMIN_JWT_TOKEN
x-api-key: your_secret_admin_key
```

**Response:**

```json
[
  {
    "id": 1,
    "user_name": "John Doe",
    "train_name": "Express Train",
    "source": "CityA",
    "destination": "CityB",
    "booking_time": "2025-02-03 14:30:00"
  }
]
```

---

## **🔹 Security & Features**

- **🔒 Role-Based Access:** Users & Admins have different privileges.
- **🔑 API Key Protection:** Admin routes require `x-api-key`.
- **⚡ Concurrency Handling:** Prevents double booking by locking database rows.
- **🛡️ JWT Authentication:** Tokens expire after 1 hour.

---

## **🚀 Run & Test the API**

### **1️⃣ Start Server**

```sh
node src/index.js  # or nodemon src/index.js
```

### **2️⃣ Test with Postman ,Tthunderclient or anything**

Use Postman to hit the API endpoint.

---

## **📌 Final Notes**

✅ Well-structured API for **Train Booking & Management**
✅ **Security-first** approach with **JWT & API Keys**
✅ **Concurrency-Safe Booking System**
✅ **Fully Tested & Ready for Deployment**

🚀 **Submitted By : Rahul Vijay Singh**
