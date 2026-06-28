import { from } from "node:stream/iter";
import { expenseBody } from '../Requestbody/expenseRequestbody';
import { Request, Response, NextFunction } from 'express'
export const expenseValidate = (req: Request, res: Response, next: NextFunction) => {
     const { Expense, Description, Date,Category }: expenseBody = req.body;
    if (req.body.Description === ('')) {
        res.json("Description must be entered");
    } else if (!Number(Expense)) {
        res.json("Enter Expense in Digits");
    } else {
        next();
    }

}