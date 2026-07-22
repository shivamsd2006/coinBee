import { Request, Response, NextFunction } from 'express';
import { expenseBody } from '../Requestbody/expenseRequestbody';
import { prisma } from '../prisma';
import { incomeValidate } from '../Middlewares/incomeValidate';
import { create } from 'node:domain';

// PIE CHART — GET /expenseRoutes/pie?timeframe=week
// Returns: [{ name: 'Groceries', value: 4200 }, { name: 'Travel', value: 1800 }]
// "value" is the key PieChart's dataKey expects
export const getPieData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const timeframe = (req.query.timeframe as string) ?? 'week';
    const now = new Date();
    let startDate: Date;
    let endDate: Date;

    // same date range logic as readExpense
    if (timeframe === 'day') {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
      endDate   = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
    } else if (timeframe === 'week') {
      const dayOfWeek = now.getDay();
      const monday    = new Date(now);
      monday.setDate(now.getDate() - ((dayOfWeek + 6) % 7));
      monday.setHours(0, 0, 0, 0);
      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);
      sunday.setHours(23, 59, 59, 999);
      startDate = monday;
      endDate   = sunday;
    } else if (timeframe === 'month') {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0);
      endDate   = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    } else {
      startDate = new Date(now.getFullYear(), 0, 1, 0, 0, 0);
      endDate   = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
    }

    // fetch all withdrawals in range, include category name
    const withdrawals = await prisma.withdrawal.findMany({
      where: { date: { gte: startDate, lte: endDate } },
      select: {
        amount:   true,
        Category: { select: { name: true } }
      }
    });

    // group by category name, sum amounts
    const totals: Record<string, number> = {};
    withdrawals.forEach(w => {
      const catName = w.Category?.name ?? 'Other';
      totals[catName] = (totals[catName] ?? 0) + w.amount;
    });

    // only return categories that have spending > 0
    const formatted = Object.entries(totals)
      .filter(([, value]) => value > 0)
      .map(([name, value]) => ({ name, value }));

    res.status(200).json(formatted);

  } catch (error) {
    next(error);
  }
};

// LINE CHART — GET /expenseRoutes/line?timeframe=week
// Identical grouping logic to readExpense — same { name, uv } shape
// Line replaces bars, data is identical
export const getLineData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const timeframe = (req.query.timeframe as string) ?? 'week';
    const now = new Date();
    let startDate: Date;
    let endDate: Date;

    if (timeframe === 'day') {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
      endDate   = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
    } else if (timeframe === 'week') {
      const dayOfWeek = now.getDay();
      const monday    = new Date(now);
      monday.setDate(now.getDate() - ((dayOfWeek + 6) % 7));
      monday.setHours(0, 0, 0, 0);
      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);
      sunday.setHours(23, 59, 59, 999);
      startDate = monday;
      endDate   = sunday;
    } else if (timeframe === 'month') {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0);
      endDate   = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    } else {
      startDate = new Date(now.getFullYear(), 0, 1, 0, 0, 0);
      endDate   = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
    }

    const withdrawals = await prisma.withdrawal.findMany({
      where:  { date: { gte: startDate, lte: endDate } },
      select: { amount: true, date: true }
    });

    let formatted: { name: string; uv: number }[] = [];

    if (timeframe === 'day') {
      const totals: Record<string, number> = {};
      for (let h = 0; h < 24; h++) totals[`${String(h).padStart(2, '0')}:00`] = 0;
      withdrawals.forEach(w => {
        const hour = `${String(w.date.getHours()).padStart(2, '0')}:00`;
        totals[hour] += w.amount;
      });
      formatted = Object.entries(totals).map(([name, uv]) => ({ name, uv }));

    } else if (timeframe === 'week') {
      const DAY_ORDER = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
      const FULL_DAY  = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
      const totals: Record<string, number> = {};
      DAY_ORDER.forEach(d => totals[d] = 0);
      withdrawals.forEach(w => {
        const fullName  = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(w.date);
        const shortName = DAY_ORDER[FULL_DAY.indexOf(fullName)];
        if (shortName) totals[shortName] += w.amount;
      });
      formatted = DAY_ORDER.map(name => ({ name, uv: totals[name] }));

    } else if (timeframe === 'month') {
      const totals: Record<string, number> = {
        'Week 1': 0, 'Week 2': 0, 'Week 3': 0, 'Week 4': 0
      };
      withdrawals.forEach(w => {
        const weekNum = Math.min(Math.ceil(w.date.getDate() / 7), 4);
        totals[`Week ${weekNum}`] += w.amount;
      });
      formatted = Object.entries(totals).map(([name, uv]) => ({ name, uv }));

    } else {
      const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      const totals: Record<string, number> = {};
      MONTHS.forEach(m => totals[m] = 0);
      withdrawals.forEach(w => {
        totals[MONTHS[w.date.getMonth()]] += w.amount;
      });
      formatted = MONTHS.map(name => ({ name, uv: totals[name] }));
    }

    res.status(200).json(formatted);

  } catch (error) {
    next(error);
  }
};

export const readExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const timeframe = (req.query.timeframe as string) ?? 'week';
    const now = new Date();
    let startDate: Date;
    let endDate: Date;

    if (timeframe === 'day') {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
      endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
    } else if (timeframe === 'week') {
      const dayOfWeek = now.getDay();
      const monday = new Date(now);
      monday.setDate(now.getDate() - ((dayOfWeek + 6) % 7));
      monday.setHours(0, 0, 0, 0);
      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);
      sunday.setHours(23, 59, 59, 999);
      startDate = monday;
      endDate = sunday;
    } else if (timeframe === 'month') {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    } else {
      startDate = new Date(now.getFullYear(), 0, 1, 0, 0, 0);
      endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
    }

    const withdrawals = await prisma.withdrawal.findMany({
      where: { date: { gte: startDate, lte: endDate } },
      select: { amount: true, date: true }
    });

    let formatted: { name: string; uv: number }[] = [];

    if (timeframe === 'day') {
      const totals: Record<string, number> = {};
      for (let h = 0; h < 24; h++) {
        totals[`${String(h).padStart(2, '0')}:00`] = 0;
      }
      withdrawals.forEach(w => {
        const hour = `${String(w.date.getHours()).padStart(2, '0')}:00`;
        totals[hour] += w.amount;
      });
      formatted = Object.entries(totals).map(([name, uv]) => ({ name, uv }));

    } else if (timeframe === 'week') {
      const DAY_ORDER = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const FULL_DAY = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      const totals: Record<string, number> = {};
      DAY_ORDER.forEach(d => totals[d] = 0);
      withdrawals.forEach(w => {
        const fullName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(w.date);
        const idx = FULL_DAY.indexOf(fullName);
        const shortName = DAY_ORDER[idx];
        if (shortName) totals[shortName] += w.amount;
      });
      formatted = DAY_ORDER.map(name => ({ name, uv: totals[name] }));

    } else if (timeframe === 'month') {
      const totals: Record<string, number> = {
        'Week 1': 0, 'Week 2': 0, 'Week 3': 0, 'Week 4': 0
      };
      withdrawals.forEach(w => {
        const weekNum = Math.min(Math.ceil(w.date.getDate() / 7), 4);
        totals[`Week ${weekNum}`] += w.amount;
      });
      formatted = Object.entries(totals).map(([name, uv]) => ({ name, uv }));

    } else {
      const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const totals: Record<string, number> = {};
      MONTHS.forEach(m => totals[m] = 0);
      withdrawals.forEach(w => {
        totals[MONTHS[w.date.getMonth()]] += w.amount;
      });
      formatted = MONTHS.map(name => ({ name, uv: totals[name] }));
    }

    res.status(200).json(formatted);

  } catch (error) {
    next(error);
  }
};

// CREATE — POST /expenseRoutes/add
export const postExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { Expense, Description, Date: expenseDate, Category } = req.body;

    // guard — stop if required fields missing
    if (!Expense || !expenseDate || !Category) {
      res.status(400).json({ error: 'Amount, Date, and Category are required' });
      return;
    }

    const transaction = await prisma.transaction.create({
      data: {
        userId: 1,
        date: new Date(expenseDate),
        Withdrawal: {
          create: {
            amount: Number(Expense),
            description: Description ?? '',
            date: new Date( expenseDate),
            Category: {
              connect: { id: Number(Category) }
            }
          }
        }
      },
      include: {
        Withdrawal: {
          include: { Category: true }
        }
      }
    });

    res.status(201).json(transaction);
  } catch (error) {
    next(error);
  }
};

// DELETE — DELETE /expenseRoutes/delete/:id
export const deleteExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deleted = await prisma.withdrawal.delete({
      where: { withdrawalId: Number(req.params.id) }
    });
    res.status(200).json(deleted);
  } catch (error) {
    next(error);
  }
};

// UPDATE — PATCH /expenseRoutes/update/:id
export const putExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { Expense, Description, Category } = req.body;
    const updated = await prisma.withdrawal.update({
      where: { withdrawalId: Number(req.params.id) },
      data: {
        ...(Expense !== undefined && { amount: Number(Expense) }),
        ...(Description !== undefined && { description: Description }),
        ...(Category !== undefined && {
          category: { connect: { id: Number(Category) } }
        })
      }
    });
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};
