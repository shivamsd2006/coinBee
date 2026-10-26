import { Request, Response, NextFunction } from 'express';
import { budgetBody } from '../Requestbody/budgetRequestbody';

export const budgetValidate = (req: Request, res: Response, next: NextFunction) => {
    const { Amount, Description, CategoryId, StartDate, EndDate }: budgetBody = req.body;

    // Amount must be a positive number
    if (!Amount || isNaN(Number(Amount)) || Number(Amount) <= 0) {
        res.status(400).json({ error: 'Please enter a valid budget amount in digits' });
        return;
    }

    // Amount cap
    if (Number(Amount) > 9_999_999_999) {
        res.status(400).json({ error: 'Amount too large. Max: ₹9,99,99,99,999' });
        return;
    }

    // Category is required
    if (!CategoryId) {
        res.status(400).json({ error: 'Category is required' });
        return;
    }

    // Dates must be valid
    if (!StartDate || isNaN(new Date(StartDate).getTime())) {
        res.status(400).json({ error: 'A valid start date is required' });
        return;
    }

    if (!EndDate || isNaN(new Date(EndDate).getTime())) {
        res.status(400).json({ error: 'A valid end date is required' });
        return;
    }

    if (new Date(StartDate) >= new Date(EndDate)) {
        res.status(400).json({ error: 'End date must be after start date' });
        return;
    }

    // Description is optional; if provided, cap at 200 chars
    if (Description && Description.length > 200) {
        res.status(400).json({ error: 'Description max 200 characters' });
        return;
    }

    next();
};
