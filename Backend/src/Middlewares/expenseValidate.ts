w
import { expenseBody } from '../src/Requestbody/expenseRequestbody';
import { Request, Response, NextFunction } from 'express'
export const expenseValidate = (req: Request, res: Response, next: NextFunction) => {
    const { Expense, Description, Date, Category }: expenseBody = req.body;
    if (req.body.Description === ('')) {
        res.json("Description must be entered");
    } else if (!Number(Expense)) {
        res.json("Enter Expense in Digits");
    }
    else if (Number(Expense) > 9_999_999_999) {

        res.status(400).json({ error: 'Amount too large' });
        return;
    }

    else if (Description && Description.length > 200) {
        res.status(400).json({ error: 'Description max 100 characters' });
        return;

    } else {
        next();
    }

}