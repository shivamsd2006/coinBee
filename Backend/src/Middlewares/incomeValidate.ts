import { Request, Response, NextFunction } from 'express';

const VALID_TYPES = ['Salary', 'Deposit', 'Part Time', 'Other'];

export const incomeValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { Income, Description, Type, Date: incomeDate } = req.body;
  console.log("validation--->",req.body);

  // amount must exist and be a positive number
  if (!Income || Number(Income) <= 0) {
    res.status(400).json({ error: 'Income must be a positive number' });
    return;
  }

  // amount cap
  if (Number(Income) > 9_999_999_999) {
    res.status(400).json({ error: 'Amount too large. Max: ₹9,99,99,99,999' });
    return;
  }

  // description length cap (optional field — only validate if provided)
  if (Description && Description.length > 200) {
    res.status(400).json({ error: 'Description max 200 characters' });
    return;
  }

 


  // date must be provided and parseable
  if (!incomeDate || isNaN(new Date(incomeDate).getTime())) {
    res.status(400).json({ error: 'A valid date is required' });
    return;
  }

  next();
};