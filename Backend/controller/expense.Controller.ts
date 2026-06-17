import { Request, Response, NextFunction } from 'express';
import { expenseBody } from '../Requestbody/expenseRequestbody';
import { setUncaughtExceptionCaptureCallback } from 'process';

export const putExpense = (req: Request, res: Response, next: NextFunction) => {
    const { Expense, Description, Category }: expenseBody = req.body;
    req.status(200).json({ Expense, Description, Category })
    res.send("very closr to get into db");
}

export const postExpense = (req: Request, res: Response, next: NextFunction) => {
    const { Expense, Description, Category }: expenseBody = req.body;
    req.status(200).json({ Expense, Description, Category })

}
export const getExpense = (req: Request, res: Response, next: NextFunction){
    req.status(200).json({ Expense, Description, Category })
}
export const deleteExpense = (req: Request, res: Response, next: NextFunction){
    req.send("just close enough to db to delete it");
}


