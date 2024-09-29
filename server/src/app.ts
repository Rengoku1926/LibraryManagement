import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import connectToDB from './db/connection';
import userRoutes from './routes/userRoutes';
import bookRoutes from './routes/bookRoutes';
import transactionRoutes from './routes/transactionRoutes';

dotenv.config();

const app = express();

// Add CORS configuration here
app.use(cors({
  origin: '*', // Allows all origins (use with caution)
}));

app.use(express.json());
app.use(bodyParser.json());

// Your API routes
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/transactions', transactionRoutes);

export default app;
