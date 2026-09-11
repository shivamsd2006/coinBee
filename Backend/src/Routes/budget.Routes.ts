import { Router } from 'express';
import { budgetValidate } from '../Middlewares/budgetValidate';
import { readBudget, postBudget, deleteBudget, putBudget } from '../controller/budget.Controller';

const router = Router();

router.get('/read',        readBudget);
router.post('/add',        budgetValidate, postBudget);
router.delete('/delete/:id', deleteBudget);
router.put('/update/:id',  putBudget);

export { router as budgetRoutes };