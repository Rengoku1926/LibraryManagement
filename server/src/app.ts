import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import connectToDB from './db/connection';
import userRoutes from './routes/userRoutes'
import bookRoutes from './routes/bookRoutes'
import transactionRoutes from './routes/transactionRoutes'
dotenv.config()

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://library-management-1926.vercel.app/', // Replace with your frontend URL
    credentials: true,
  }));
  

app.use('/api/users', userRoutes)
app.use('/api/books', bookRoutes)
app.use('/api/transactions', transactionRoutes)

app.use(bodyParser.json());

export default app;