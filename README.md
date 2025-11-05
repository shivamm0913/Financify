# 💰 Financify - Income & Expense Tracker

A full-stack **Income and Expense Tracker** that helps users manage their finances efficiently.  
Track your total balance, income, and expenses — all visualized with clean charts and an intuitive dashboard.

---

## 🚀 Live Demo
👉 [Click here to view the live app](https://financify-tracker.vercel.app/)

---

## ⚙️ Features

### 🔐 Authentication
- Secure **Signup/Login** using **JWT**
- **Protected routes** on both frontend & backend for data safety

### 📊 Dashboard
- Overview of **Total Balance, Total Income, Total Expense**
- **Recent Transactions** list
- **30/60 day view** with interactive **charts (line, bar, pie)**

### 💰 Income Management
- Add, list, and delete income entries  
- Download income data as **Excel file**

### 💸 Expense Management
- Add, list, and delete expense entries  
- Download expense data as **Excel file**

### 👤 User Profile
- View & update profile information  
- Upload profile photo (served from `/uploads`)

---

## 🧠 Tech Stack

**Frontend:** React.js, Tailwind CSS, Axios, Chart.js  
**Backend:** Node.js, Express.js, MongoDB, JWT Auth  
**Others:** Multer (for image uploads), CORS, dotenv

---

## 🛠️ Installation (For Local Setup)

> Note: All environment variables and API URLs are hidden for security.  
> You can configure your own `.env` file when running locally.

```bash
# Clone the repository
git clone https://github.com/shivamm0913/financify-tracker.git

# Navigate to project folder
cd financify-tracker

# Install dependencies
npm install

# Run the app
npm start
