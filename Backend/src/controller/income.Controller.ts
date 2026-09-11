import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../db/prisma';

export const readIncome = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const typeFilter = req.query.type as string;

    
    const where = typeFilter && typeFilter !== 'all'
      ? { Type: { name: typeFilter } }
      : {};

    const deposits = await prisma.deposit.findMany({
      where,
      orderBy: { date: 'desc' },  // newest first
      select: {
        depositId:   true,
        amount:      true,
        description: true,
        date:        true,
        Type:        { select: { name: true } }
      }
    });

    // group by date string — "2026-07-24"
    // result: { "2026-07-24": [{ depositId, amount, ... }], ... }
    const grouped: Record<string, typeof deposits> = {};

    deposits.forEach(d => {
      // format date as readable string for the group key
      const dateKey = d.date.toISOString().split('T')[0]; // "2026-07-24"
      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push(d);
    });

    // convert to array of { date, entries } so frontend can map over it
    const formatted = Object.entries(grouped).map(([date, entries]) => ({
      date,
      entries,
    }));

    res.status(200).json(formatted);

  } catch (error) {
    next(error);
  }
};

export const postIncome = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { Income, Description, Type, Date: incomeDate } = req.body;
    console.log("Income controller -->",req.body);

    if (!Income || !incomeDate || !Type) {
      res.status(400).json({ error: 'Amount, Date, and Type are required' });
      return;
    }

    const transaction = await prisma.transaction.create({
      data: {
        userId: 1,
        date:   new Date(incomeDate),
        Deposit: {
          create: {
            amount:      Number(Income),
            description: Description ?? '',
            date:        new Date(incomeDate),
            Type: {
              connect: { id:Number( Type) }
            }
          }
        }
      },
      include: {
        Deposit: {
          include: { Type: true }
        }
      }
    });

    res.status(201).json(transaction);

  } catch (error) {
    next(error);
  }
};

export const putIncome = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { Income, Description, Type, Date: incomeDate } = req.body;

    const updated = await prisma.deposit.update({
      where: { depositId: Number(req.params.id) },
      data: {
        ...(Income      !== undefined && { amount:      Number(Income) }),
        ...(Description !== undefined && { description: Description }),
        ...(Type        !== undefined && {
          Type: { connect: { id: Type } }
        }),
      }
    });

    res.status(200).json(updated);

  } catch (error) {
    next(error);
  }
};