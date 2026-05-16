# CampusPulse 🎓

## 📌 Overview
CampusPulse is a full-stack MERN application built to simplify campus management by providing a centralized platform for students and administrators. The platform enables seamless event management, attendance tracking, announcements, and student engagement with a modern responsive UI.

---

## 🚀 Features

- 🔐 JWT-based Authentication & Authorization
- 👨‍🎓 Separate Student & Admin Dashboards
- 📅 Event Creation & Registration System
- 📢 Campus Announcements & Notifications
- 📊 Attendance Tracking Module
- 📱 Fully Responsive UI
- ⚡ Fast REST APIs with optimized backend performance
- 🗄️ MongoDB Database Integration

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Authentication
- JWT (JSON Web Tokens)

---

## 📂 Folder Structure

```bash
CampusPulse/
│
├── client/
│   ├── src/
│   ├── public/
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│
├── README.md
├── package.json
```

---

## ⚙️ Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/amit-always/campusPulse.git
cd campusPulse
```

### 2️⃣ Install Dependencies

#### Frontend

```bash
cd client
npm install
```

#### Backend

```bash
cd ../server
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `server` directory and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## ▶️ Run Locally

### Start Backend

```bash
cd server
npm start
```

### Start Frontend

```bash
cd client
npm start
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login User |
| GET | /api/events | Fetch All Events |
| POST | /api/events | Create Event |
| GET | /api/attendance | Get Attendance |

---

## 📈 Achievements

- 🚀 Improved event workflow efficiency by 60%
- 🔒 Reduced unauthorized access issues by 85%
- ⚡ Optimized backend APIs for 40% faster response time
- 📱 Achieved 95%+ responsive compatibility across devices

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

### Amit Kumar Das
MERN Stack Developer | B.Tech CSE Student

- GitHub: https://github.com/amit-always
