import { Router } from 'express';
import { budgetValidate } from '../Middlewares/budgetValidate';
import { putBudget} from '../controller/budget.Controller';
import { postBudget} from '../controller/budget.Controller';

const router = Router();
  router.put("/update", budgetValidate,putBudget)
  router.post("/add", budgetValidate,postBudget )
  
export {router as budgetRoutes};


