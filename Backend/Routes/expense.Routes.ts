import { Router } from 'express';
import { expenseValidate } from '../Middlewares/expenseValidate';
import { deleteExpense, putExpense, readExpense } from '../controller/expense.Controller';
import { postExpense } from '../controller/expense.Controller';

const router = Router();
  router.put("/update", expenseValidate,putExpense)
  router.post("/add", expenseValidate,postExpense )
  router.get('/read',readExpense)
  router.delete('/delete',deleteExpense)
  
export {router as expenseRoutes};


