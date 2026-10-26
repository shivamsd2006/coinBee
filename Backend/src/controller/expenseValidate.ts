import { Request, Response, NextFunction } from 'express';
import { expenseBody } from '../Requestbody/expenseRequestbody';

export const expenseValidate = (req: Request, res: Response, next: NextFunction) => {
    const { Expense, Description, Date: expenseDate, Category }: expenseBody = req.body;

    if (!Expense || isNaN(Number(Expense)) || Number(Expense) <= 0) {
        res.status(400).json({ error: 'Please enter a valid expense amount in digits' });
        return;
    }

    if (Number(Expense) > 9_999_999_999) {
        res.status(400).json({ error: 'Amount too large. Max: ₹9,99,99,99,999' });
        return;
    }

    if (!Category) {
        res.status(400).json({ error: 'Category is required' });
        return;
    }

    if (!expenseDate || isNaN(new Date(expenseDate).getTime())) {
        res.status(400).json({ error: 'A valid date is required' });
        return;
    }

    if (Description && Description.length > 200) {
        res.status(400).json({ error: 'Description max 200 characters' });
        return;
    }

    next();
};
