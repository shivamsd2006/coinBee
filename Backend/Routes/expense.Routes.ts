import { Router, Request, Response, NextFunction } from 'express';
import { expenseValidate } from '../Middlewares/expenseValidate';
import { putExpense } from '../controller/expense.Controller';

const router = Router();
export function expenseRoutes(req: Request, res: Response, next: NextFunction) {
  router.get("/expense.Routes"){
    res.send('sent to controller');
  }
  router.put("", expenseValidate){

  }
  router.post("/expense.Routes", expenseValidate, putExpense){
    res.send('sent to controller');
  }
  router.delete()
}

