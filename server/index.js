const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // For serving images

// Routes
const authRoutes = require('./routes/auth');
const issueRoutes = require('./routes/issues');

app.use('/api/auth', authRoutes);
app.use('/api/issues', issueRoutes);

// Database connection
async function connectDB() {
  try {
    let mongoUri = process.env.MONGODB_URI;
    
    if (mongoUri.includes('localhost') || mongoUri.includes('127.0.0.1')) {
       try {
         // Try to connect to local first
         await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 2000 });
         console.log('Connected to local MongoDB');
       } catch (err) {
         console.log('Local MongoDB not running. Spinning up in-memory MongoDB server...');
         const { MongoMemoryServer } = require('mongodb-memory-server');
         const mongoServer = await MongoMemoryServer.create();
         mongoUri = mongoServer.getUri();
         await mongoose.connect(mongoUri);
         console.log('Connected to In-Memory MongoDB (Data will reset on server restart)');
       }
    } else {
       await mongoose.connect(mongoUri);
       console.log('Connected to MongoDB');
    }
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
