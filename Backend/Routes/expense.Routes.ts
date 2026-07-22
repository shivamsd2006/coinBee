import { Router } from 'express';
import { expenseValidate } from '../Middlewares/expenseValidate';
import { deleteExpense, putExpense, readExpense } from '../controller/expense.Controller';
import { postExpense } from '../controller/expense.Controller';
import { getPieData, getLineData } from '../controller/expense.Controller';

const router = Router();



router.get('/pie',  getPieData);
router.get('/line', getLineData);
router.put("/update/:id", expenseValidate, putExpense)
router.post("/add", expenseValidate, postExpense)
router.get('/read', readExpense)
router.delete('/delete/:id', deleteExpense)

export { router as expenseRoutes };


