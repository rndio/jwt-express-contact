import express from 'express';
import publicRouter from '../routes/public-api.js';
import errorMiddleware from '../middleware/error-middleware.js';
import userRouter from '../routes/api.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const corsOptions = {
  origin: process.env.CLIENT_URL ?? 'http://localhost:5173',
  credentials: true
}

export const web = express();
web.use(express.json());
web.use(cors(corsOptions));
web.use(cookieParser());

web.use(publicRouter);
web.use(userRouter);

web.use(errorMiddleware)
