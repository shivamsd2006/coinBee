import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 5000;


const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
app.use(cors({ origin: allowedOrigin }));

import {expenseRoutes} from './src/Routes/expense.Routes'
import{incomeRoutes} from './src/Routes/income.Routes'
import{budgetRoutes} from'./src/Routes/budget.Routes'
  

app.use(express.json());
app.use("/api/expenseRoutes",expenseRoutes);
app.use("/api/incomeRoutes",incomeRoutes);
app.use("/api/budgetRoutes",budgetRoutes);



app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
