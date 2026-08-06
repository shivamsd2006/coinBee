import { Request, Response, NextFunction } from 'express';
import { prisma } from '../prisma';


export const readBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const budgets = await prisma.budget.findMany({
      where:   { userId: 1 },
      include: { Category: true },
      orderBy: { startDate: 'desc' },
    });

  
    const budgetsWithSpending = await Promise.all(
      budgets.map(async (budget) => {

      
        const spendingResult = await prisma.withdrawal.aggregate({
          where: {
            categoryId: budget.categoryId,
            date: {
              gte: budget.startDate,  
              lte: budget.endDate,   
            }
          },
          _sum: { amount: true }
        });

       
        const amountSpent = spendingResult._sum.amount ?? 0;

      
        const percentageSpent = (amountSpent / budget.amount) * 100;

     
        let status: 'ok' | 'full' | 'exceeded';
        if (percentageSpent > 100) {
          status = 'exceeded';   // red bar
        } else if (percentageSpent === 100) {
          status = 'full';       // blue bar
        } else {
          status = 'ok';         // green bar
        }

        return {
          budgetId:       budget.budgetId,
          categoryName:   budget.Category.name,
          description:    budget.description,
          allocatedAmount: budget.amount,
          amountSpent,
          percentageSpent: Math.round(percentageSpent * 10) / 10, 
          status,
          startDate:      budget.startDate,
          endDate:        budget.endDate,
        };
      })
    );

    res.status(200).json(budgetsWithSpending);

  } catch (error) {
    next(error);
  }
};


export const postBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { Amount, Description, CategoryId, StartDate, EndDate } = req.body;

    const budget = await prisma.budget.create({
      data: {
        userId:      1,
        categoryId:  Number(CategoryId),
        amount:      Number(Amount),
        description: Description ?? '',
        startDate:   new Date(StartDate),
        endDate:     new Date(EndDate),
      },
      include: { Category: true }
    });

    res.status(201).json(budget);

  } catch (error) {
    next(error);
  }
};


export const deleteBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deleted = await prisma.budget.delete({
      where: { budgetId: Number(req.params.id) }
    });
    res.status(200).json(deleted);
  } catch (error) {
    next(error);
  }
};


export const putBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { Amount, Description } = req.body;
    const updated = await prisma.budget.update({
      where: { budgetId: Number(req.params.id) },
      data: {
        ...(Amount      !== undefined && { amount:      Number(Amount) }),
        ...(Description !== undefined && { description: Description }),
      }
    });
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};