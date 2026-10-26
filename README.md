#  coinBee

> **Your Money, Simplified.** Track expenses, set category budgets, and watch your hive grow.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-Backend-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-4169E1?logo=postgresql&logoColor=white)](https://supabase.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## 📖 What is coinBee?

**coinBee** is a full-stack personal finance web application. Tracking money should never feel like doing homework. Most finance spreadsheets and budget apps are cluttered, overwhelming, or tedious to keep up with. **coinBee** solves this by turning your daily financial activity into beautiful, actionable visual intelligence—helping you understand exactly where your money goes with zero friction.

---

---

##  Features

### 1.  Visual Expense Analytics

- **Category Breakdown**: Interactive donut pie chart highlighting your highest spending areas (Groceries, Travel, Food, Housing, etc.).
- **One-Touch Timeframe Switcher**: Instant switching between **Day**, **Week**, **Month**, and **Year**.

### 2.Category Budgets
- **Category Caps**: Allocate monthly or custom date-range limits per spending category.
- **Remaining Balance**: Live calculation of how much safe spending room you have left.

### 3.  Income & Deposit Streams
-  Track salary, bank deposits, freelance gigs, and side hustles.
- Filter deposits by type (`Salary`, `Deposit`, `Part Time`, `Other`) with one click.

---


##  Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS v4, Recharts, Lucide Icons, React Slick |
| **Backend** | Node.js, Express, TypeScript |
| **ORM & Database** | Prisma 7, PostgreSQL (Hosted on Supabase ) |
| **Deployment** | Vercel , Render (Backend Web Service) |


---

##  Project Structure

```bash
coinBee/
├── Backend/
│   ├── db/
│   │   └── prisma.ts                # Shared Prisma client instance
│   ├── prisma/
│   │   └── schema.prisma            # Database schema models (User, Budget, Withdrawal, etc.)
│   ├── src/
│   │   ├── controller/              # Route controllers & validation middleware
│   │   │   ├── expense.Controller.ts
│   │   │   ├── expenseValidate.ts
│   │   │   ├── budget.Controller.ts
│   │   │   ├── budgetValidate.ts
│   │   │   ├── income.Controller.ts
│   │   │   └── incomeValidate.ts
│   │   ├── Requestbody/             # TypeScript request interfaces
│   │   └── Routes/                  # Express API routers
│   ├── index.js                     # Express server entry point & CORS configuration
│   └── package.json
│
├── Frontend/
│   ├── components/
│   │   ├── Header/                  # Top brand navigation & live status
│   │   ├── Sidebar/                 # Segmented mobile/tablet nav pills
│   │   ├── Report/                  # Main analytics dashboard & chart slider
│   │   ├── ExpenseForm/             # Floating expense modal form
│   │   ├── Budget/                  # Rocket Money-style budget cards grid
│   │   ├── BudgetForm/              # Floating budget creation modal
│   │   ├── Income/                  # Income stream timeline & summary
│   │   ├── IncomeForm/              # Floating income entry modal
│   │   └── Footer/                  # Minimalist footer
│   ├── src/
│   │   ├── UiComponents/            # Reusable UI primitives (Button, Input, Switchers)
│   │   ├── UiDashboards/            # Chart components (Bar, Pie, Line)
│   │   ├── App.jsx                  # Root layout & route definitions
│   │   ├── index.css                # Tailwind CSS v4 imports & custom scrollbar
│   │   └── main.jsx
│   ├── vercel.json                  # Frontend SPA routing & API proxy rewrites
│   └── package.json
│
├── vercel.json                      # Root Vercel proxy configuration
└── README.md
```

---

##  Getting Started

Follow these steps to run **coinBee** locally on your machine.

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- A free [Supabase](https://supabase.com/) PostgreSQL database

---

### 1. Clone the Repository
```bash
git clone https://github.com/shivamsd2006/coinBee.git
cd coinBee
```

---

### 2. Set Up the Backend

1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   npm install
   ```

2. Create a `.env` file inside `Backend/`:
   ```env
   PORT=5000
   DATABASE_URL="postgresql://postgres.[YOUR-REF]:[YOUR-PASSWORD]@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
   DIRECT_URL="postgresql://postgres.[YOUR-REF]:[YOUR-PASSWORD]@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres"
   CORS_ORIGIN="http://localhost:5173"
   ```

3. Generate the Prisma Client:
   ```bash
   npx prisma generate
   ```

4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The backend will start at `http://localhost:5000`.*

---

### 3. Set Up the Frontend

1. Open a new terminal and navigate to `Frontend`:
   ```bash
   cd Frontend
   npm install
   ```

2. Start the Vite development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```


---

##  Roadmap

- [x] UI/UX redesign with dark-mode aesthetic
- [x] Interactive Recharts charts (Histogram, Donut, Trajectory)
- [x] Live progress tracks with automated 
- [ ] User Authentication 
- [ ] Monthly Financial Health Score
- [ ] CSV & PDF Statement Export


---

## Contribution

Contributions are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/newFeature`)
3. Commit your Changes (`git commit -m 'Add newFeature'`)
4. Push to the Branch (`git push origin feature/newFeature`)
5. Open a Pull Request

