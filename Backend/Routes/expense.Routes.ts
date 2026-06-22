import { Router } from 'express';
import { expenseValidate } from '../Middlewares/expenseValidate';
import { putExpense } from '../controller/expense.Controller';
import { postExpense } from '../controller/expense.Controller';

const router = Router();
  router.put("/update", expenseValidate,putExpense)
  router.post("/add", expenseValidate,postExpense )
  
export {router as expenseRoutes};


