import { Request, Response, NextFunction } from 'express';
import { incomeBody } from '../Requestbody/incomeRequestbody';

export const putIncome = (req: Request, res: Response, next: NextFunction) => {
    const { Income, Description, Type }: incomeBody = req.body;
    res.status(200).json({ Income, Description, Type })

}

export const postIncome = (req: Request, res: Response, next: NextFunction) => {
    const { Income, Description, Type }: incomeBody = req.body;
    res.status(200).json({ Income, Description, Type })

}



