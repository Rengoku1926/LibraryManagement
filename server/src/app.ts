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
app.options('*', cors()); // Handles preflight requests for all routes

app.use(cors({
  origin: 'https://library-management-client23.vercel.app',  
  methods: ['GET', 'POST', 'OPTIONS']
}));

app.use(express.json());
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/transactions', transactionRoutes);

export default app;
