
import { budgetBody } from '../Requestbody/budgetRequestbody';
import { Request, Response, NextFunction } from 'express'
export const budgetValidate = (req: Request, res: Response, next: NextFunction) => {
    const { Amount, Description, StartDate, EndDate }: budgetBody = req.body;
    if (req.body.Description === ('')) {
        res.json("Description must be entered");
    } else if (!Number(Amount)) {
        res.json("Enter Expense in Digits");
    } else {
        next();
    }

}