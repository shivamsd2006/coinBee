import { from } from "node:stream/iter";
import { incomeBody} from '../Requestbody/incomeRequestbody';
import { Request, Response, NextFunction } from 'express'
export const incomeValidate = (req: Request, res: Response, next: NextFunction) => {
     const { Income, Description, Type }: incomeBody = req.body;
    if (req.body.Description === ('')) {
        res.json("Description must be entered");
    } else if (!Number(Income)) {
        res.json("Enter Income in Digits");
    } else {
        next();
    }

}