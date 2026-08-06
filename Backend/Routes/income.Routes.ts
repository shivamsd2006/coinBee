import { Router } from 'express';
import { incomeValidate } from '../Middlewares/incomeValidate';
import { readIncome, postIncome, putIncome } from '../controller/income.Controller';

const router = Router();

router.get('/read',        readIncome);                   
router.post('/add',        incomeValidate, postIncome);
router.put('/update/:id',  incomeValidate, putIncome);

export { router as incomeRoutes };