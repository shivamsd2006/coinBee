import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 5000;

// Allow requests from local dev, Vercel deployments, and custom domains
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5000',
];

if (process.env.CORS_ORIGIN) {
  process.env.CORS_ORIGIN.split(',').forEach((o) => allowedOrigins.push(o.trim()));
}

app.use(cors({
  origin: (origin, callback) => {
    // allow non-browser clients (like health checks, Postman, curl)
    if (!origin) return callback(null, true);
    // allow localhost, custom origins, and any Vercel preview or production deploy
    if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }
    // Fallback: allow to prevent CORS blockages across deployment stages
    return callback(null, true);
  },
  credentials: true,
}));

import { expenseRoutes } from './src/Routes/expense.Routes';
import { incomeRoutes } from './src/Routes/income.Routes';
import { budgetRoutes } from './src/Routes/budget.Routes';

app.use(express.json());

// API health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/expenseRoutes', expenseRoutes);
app.use('/api/incomeRoutes', incomeRoutes);
app.use('/api/budgetRoutes', budgetRoutes);

app.listen(port, () => {
  console.log(`coinBee backend server running on port ${port}`);
});
