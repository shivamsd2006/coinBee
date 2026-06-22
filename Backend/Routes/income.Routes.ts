import { Router } from 'express';
import { incomeValidate } from '../Middlewares/incomeValidate';
import { putIncome } from '../controller/income.Controller';
import { postIncome } from '../controller/income.Controller';

const router = Router();
  router.put("/update", incomeValidate,putIncome)
  router.post("/add", incomeValidate,postIncome )
  
export {router as incomeRoutes};


