import express from 'express';
import cors from 'cors';

import { expenseRoutes } from './src/Routes/expense.Routes';
import { incomeRoutes } from './src/Routes/income.Routes';
import { budgetRoutes } from './src/Routes/budget.Routes';

import 'dotenv/config';


const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
];

if (process.env.CORS_ORIGIN) {
  process.env.CORS_ORIGIN.split(',').forEach((o) => allowedOrigins.push(o.trim().replace(/\/$/, '')));
}

app.use(cors({
  origin: (origin, callback) => {
   
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

   
    return callback(new Error(`CORS policy: Origin ${origin} not allowed`));
  },
  credentials: true,
}));
app.use(express.json());


app.use('/api/expenseRoutes', expenseRoutes);
app.use('/api/incomeRoutes', incomeRoutes);
app.use('/api/budgetRoutes', budgetRoutes);

app.listen(port, () => {
  console.log(`coinBee backend server running on port ${port}`);
});
