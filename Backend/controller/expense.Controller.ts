import { Request, Response, NextFunction } from 'express';
import { expenseBody } from '../Requestbody/expenseRequestbody';
import { prisma } from '../prisma';
import { incomeValidate } from '../Middlewares/incomeValidate';
import { create } from 'node:domain';
export const putExpense = (req: Request, res: Response, next: NextFunction) => {
  const { Expense, Description, Date, Category }: expenseBody = req.body;
  res.status(200).json({ Expense, Description, Date, Category })

}



export const readExpense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // read the timeframe query param — defaults to 'week' if missing
    const timeframe = (req.query.timeframe as string) ?? 'week';

    const now = new Date();
    let startDate: Date;
    let endDate: Date;

    // calculate date range based on timeframe
    if (timeframe === 'day') {
      // today only — midnight to 23:59:59
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
      endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

    } else if (timeframe === 'week') {
      // Monday to Sunday of current week
      const dayOfWeek = now.getDay();                      // 0=Sun 1=Mon...6=Sat
      const monday = new Date(now);
      monday.setDate(now.getDate() - ((dayOfWeek + 6) % 7)); // go back to Monday
      monday.setHours(0, 0, 0, 0);
      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);
      sunday.setHours(23, 59, 59, 999);
      startDate = monday;
      endDate = sunday;

    } else if (timeframe === 'month') {
      // first to last day of current month
      startDate = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    } else {
      // year — Jan 1 to Dec 31
      startDate = new Date(now.getFullYear(), 0, 1, 0, 0, 0);
      endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
    }

    // fetch withdrawals within the date range
    const withdrawals = await prisma.withdrawal.findMany({
      where: {
        date: { gte: startDate, lte: endDate }
      },
      select: {
        amount: true,
        date: true,
      }
    });

    // group results based on timeframe
    let formatted: { name: string; uv: number }[] = [];

    if (timeframe === 'day') {
      // group by hour — 00:00, 01:00 ... 23:00
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
      // group by day name — Mon Tue Wed Thu Fri Sat Sun
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
      // group by week number — Week 1 Week 2 Week 3 Week 4
      const totals: Record<string, number> = {
        'Week 1': 0, 'Week 2': 0, 'Week 3': 0, 'Week 4': 0,
      };
      withdrawals.forEach(w => {
        const dayOfMonth = w.date.getDate();             // 1-31
        const weekNum = Math.min(Math.ceil(dayOfMonth / 7), 4);
        totals[`Week ${weekNum}`] += w.amount;
      });
      formatted = Object.entries(totals).map(([name, uv]) => ({ name, uv }));

    } else {
      // group by month name — Jan Feb Mar ... Dec
      const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const totals: Record<string, number> = {};
      MONTHS.forEach(m => totals[m] = 0);

      withdrawals.forEach(w => {
        const monthName = MONTHS[w.date.getMonth()];
        totals[monthName] += w.amount;
      });
      formatted = MONTHS.map(name => ({ name, uv: totals[name] }));
    }

    res.status(200).json(formatted);

  } catch (error) {
    next(error);
  }
 
};






export const deleteExpense = async (req: Request, res: Response, next: NextFunction) => {
  const deleted = await prisma.withdrawal.delete({
    where: { withdrawalId: Number(req.params.id) }
  });
  res.status(200).json(deleted)
}


export const postExpense = async (req: Request, res: Response, next: NextFunction) => {
  const { Expense, Description, Date, Category }: expenseBody = req.body;
  try {
    const transaction = await prisma.transaction.create({
      data: {
        userId: 1,
        date: Date,
        Withdrawal: {
          create: {
            amount: Number(Expense),
            description: Description,
            date: new Date(Date),
            Category: {
              connect: { id: Number(Category) }
            },
          },
        },

      },
      include: {
        Withdrawal: {
          include: {
            Category: true
          }
        }
      }
    });
    console.log('Created Deposit:', transaction);
    res.status(200).json({ transaction })
  } catch (error) {
    next(error);
  }

}
