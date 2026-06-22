import { Request, Response, NextFunction } from 'express';
import { budgetBody } from '../Requestbody/budgetRequestbody';

export const putBudget = (req: Request, res: Response, next: NextFunction) => {
    const { Amount, Description, StartDate, EndDate }: budgetBody = req.body;
    res.status(200).json({ Amount, Description, StartDate, EndDate })
}

export const postBudget = (req: Request, res: Response, next: NextFunction) => {
    const { Amount, Description, StartDate, EndDate }: budgetBody = req.body;
    res.status(200).json({ Amount, Description, StartDate, EndDate })

}



