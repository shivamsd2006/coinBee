import express from 'express'
import cors from 'cors'
const app = express();
const port = 5000;
app.use(cors({ origin: 'http://localhost:5173' }));
import {expenseRoutes} from './Routes/expense.Routes'
import{incomeRoutes} from './Routes/income.Routes'
import{budgetRoutes} from'./Routes/budget.Routes'


app.use(express.json());
app.use("/expenseRoutes",expenseRoutes);
app.use("/incomeRoutes",incomeRoutes);
app.use("/budgetRoutes",budgetRoutes);





app.listen(port, () => {
  console.log(`server is running on http:localhost:${port}`);
});

