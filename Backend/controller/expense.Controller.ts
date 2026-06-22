import { Request, Response, NextFunction } from 'express';
import { expenseBody } from '../Requestbody/expenseRequestbody';

export const putExpense = (req: Request, res: Response, next: NextFunction) => {
    const { Expense, Description, Category }: expenseBody = req.body;
    res.status(200).json({ Expense, Description, Category })
    
}

export const postExpense = (req: Request, res: Response, next: NextFunction) => {
    const { Expense, Description, Category }: expenseBody = req.body;
    res.status(200).json({ Expense, Description, Category })

}



