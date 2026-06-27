import express from 'express';
import dotenv from 'dotenv';
import router from './routes/route.js';
import userRouter from './routes/userRoute.js';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
const isProduction = process.env.NODE_ENV === 'production';

const allowedOrigins = [
  'http://localhost:5173',
  ...(process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(',').map((o) => o.trim()).filter(Boolean)
    : []),
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      console.warn(`CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get('/', (_req, res) => {
  res.status(200).json({ status: 'ok', message: 'Voxa AI Backend is running.' });
});


app.use('/api/auth/', router);
app.use('/api/user/', userRouter);

app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ message: 'Internal server error' });
});


app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT} [${isProduction ? 'production' : 'development'}]`);
  if (!process.env.GEMINI_API_KEY) {
    console.warn('GEMINI_API_KEY is missing — AI features will fail.');
  }
  if (!process.env.JWT_SECRET) {
    console.warn('JWT_SECRET is missing — auth will fail.');
  }
});

connectDB().catch((err) => {
  console.error('Database connection failed:', err.message);
});
