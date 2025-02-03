// / <reference path="./@types/express/index.d.ts" />
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI || '')
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Default Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Product API Routes
app.use('/api', router); 

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));