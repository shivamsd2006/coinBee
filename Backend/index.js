import express from 'express'
import cors from 'cors'
import 'dotenv/config'
const app = express();
const port = process.env.PORT;
app.use(cors({ origin: 'http://localhost:5173' }));
import {expenseRoutes} from './Routes/expense.Routes'
import{incomeRoutes} from './Routes/income.Routes'
import{budgetRoutes} from'./Routes/budget.Routes'


app.use(express.json());
app.use("/api/expenseRoutes",expenseRoutes);
app.use("/api/incomeRoutes",incomeRoutes);
app.use("/api/budgetRoutes",budgetRoutes);





app.listen(port, () => {
  console.log(`server is running on http:localhost:${port}`);
});

