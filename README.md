# 🐝 coinBee

> **Your Money, Simplified.** Track expenses, set category budgets, and watch your hive grow.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-Backend-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-4169E1?logo=postgresql&logoColor=white)](https://supabase.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## 📖 What is coinBee?

**coinBee** is a modern, full-stack personal finance web application inspired by the sleek, high-trust fintech aesthetic of **Rocket Money**. 

Managing money should never feel like doing homework. Most finance spreadsheets and budget apps are cluttered, overwhelming, or tedious to keep up with. **coinBee** solves this by turning your daily financial activity into beautiful, actionable visual intelligence—helping you understand exactly where your money goes with zero friction.

---

## 🎯 Purpose

- **Financial Clarity**: Know your cash flow at a glance without sorting through bank statements.
- **Disciplined Spending**: Set category limits and see real-time progress before you overspend.
- **Frictionless Logging**: Add expenses, income, or budgets in seconds with keyboard-friendly floating modals.
- **Rewarding Visuals**: View your trends on interactive histograms, category distribution donuts, and trajectory curves.

---

## ✨ Features

### 1. 📊 Visual Expense Analytics
- **Dynamic Histograms**: Daily, weekly, monthly, and yearly outflow bars with intelligent grouping.
- **Category Breakdown**: Interactive donut pie chart highlighting your highest spending areas (Groceries, Travel, Food, Housing, etc.).
- **Spending Trajectory**: Smooth line chart showing cumulative spending patterns over time.
- **One-Touch Timeframe Switcher**: Instant switching between **Day**, **Week**, **Month**, and **Year**.

### 2. 🎯 Rocket Money-Style Category Budgets
- **Category Caps**: Allocate monthly or custom date-range limits per spending category.
- **Smart Progress Tracks**:
  - 🟢 **On Track** (0–80%): Vibrant electric mint indicator.
  - 🔵 **At Limit** (80–100%): Focused blue alert.
  - 🔴 **Exceeded** (>100%): Coral-red warning badge with exact "Over by ₹X" calculation.
- **Remaining Balance**: Live calculation of how much safe spending room you have left.

### 3. 💰 Income & Deposit Streams
- **Multi-Source Logging**: Track salary, bank deposits, freelance gigs, and side hustles.
- **Filtered Streams**: Filter deposits by type (`Salary`, `Deposit`, `Part Time`, `Other`) with one click.
- **Timeline View**: Automatically groups deposits by date for a clean transaction ledger.

### 4. ⚡ Seamless User Experience
- **Glassmorphic Modals**: Floating dark cards with backdrop blur, light dismiss (click outside to close), and explicit close (`✕`) buttons.
- **Instant Visual Feedback**: Success toasts and inline error messages confirm every action.
- **Dark-Mode Fintech UI**: Deep midnight obsidian canvas (`#0A0E17`), electric mint accents (`#00D09C`), and crisp **Plus Jakarta Sans** typography.

---

## 🏗️ Architecture & How It Works

```
┌────────────────────────────────────────────────────────┐
│                   Browser Client                       │
│        (React 19 + Tailwind CSS v4 + Recharts)         │
└───────────────────────────┬────────────────────────────┘
                            │
                            │  Fetch: /api/...
                            ▼
┌────────────────────────────────────────────────────────┐
│                   Vercel Edge Proxy                    │
│      (Rewrites: /api/:path* ➔ Render Web Service)      │
└───────────────────────────┬────────────────────────────┘
                            │
                            │  Server-to-Server Proxy
                            ▼
┌────────────────────────────────────────────────────────┐
│                 Render Node/Express API                │
│       (TypeScript + Express + Validation Layers)       │
└───────────────────────────┬────────────────────────────┘
                            │
                            │  Prisma 7 ORM
                            ▼
┌────────────────────────────────────────────────────────┐
│             Supabase PostgreSQL Database               │
│       (Transaction Pooler on Port 6543 / SSL)          │
└────────────────────────────────────────────────────────┘
```

### How the Data Flows
1. **User Action**: You log an expense or create a budget in the frontend.
2. **Reverse Proxy Rewrite**: The browser requests `/api/expenseRoutes/add`. Vercel's edge rewrites transparently forward the request to the backend hosted on Render.
3. **Validation & Controller**: Express runs validation middleware ([expenseValidate.ts](Backend/src/controller/expenseValidate.ts)), ensuring amounts, categories, and dates are valid.
4. **Database Insertion**: Prisma ORM creates a relational record linking `User ➔ Transaction ➔ Withdrawal` in Supabase PostgreSQL.
5. **Reactive UI**: The frontend receives the confirmed record, displays a success toast, closes the modal, and refreshes all charts automatically.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS v4, Recharts, Lucide Icons, React Slick, React Router 7 |
| **Backend** | Node.js, Express, TypeScript, TSX, CORS, Dotenv |
| **ORM & Database** | Prisma 7, PostgreSQL (Hosted on Supabase via AWS ap-southeast-1 pooler) |
| **Deployment** | Vercel (Frontend & Edge Proxy), Render (Backend Web Service) |
| **Design Language**| Rocket Money Inspired (Midnight Obsidian `#0A0E17`, Mint `#00D09C`, Plus Jakarta Sans) |

---

## 📁 Project Structure

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

## 🚀 Getting Started

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

## 📡 API Reference

All routes are mounted under `/api`.

### Expenses (`/api/expenseRoutes`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/read?timeframe=week` | Get expense history grouped by timeframe (`day`, `week`, `month`, `year`) |
| `GET` | `/pie?timeframe=week` | Get category sums for the donut pie chart |
| `GET` | `/line?timeframe=week` | Get trend line data points |
| `POST` | `/add` | Add a new expense (`Expense`, `Description`, `Date`, `Category`) |
| `DELETE` | `/delete/:id` | Delete an expense by withdrawal ID |
| `PUT` | `/update/:id` | Update an existing expense |

### Budgets (`/api/budgetRoutes`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/read` | Fetch all user budgets with live spent amounts and status calculation |
| `POST` | `/add` | Create a new budget limit (`Amount`, `CategoryId`, `StartDate`, `EndDate`) |
| `DELETE` | `/delete/:id` | Remove a budget |
| `PUT` | `/update/:id` | Modify budget amount or notes |

### Income (`/api/incomeRoutes`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/read?type=all` | Fetch deposits grouped by date (filter by `Salary`, `Deposit`, etc.) |
| `POST` | `/add` | Record a new income stream (`Income`, `Type`, `Date`, `Description`) |
| `PUT` | `/update/:id` | Update income record |

---

## 🗺️ Roadmap

- [x] Complete Rocket Money UI/UX redesign with dark-mode aesthetic
- [x] Interactive Recharts charts (Histogram, Donut, Trajectory)
- [x] Live progress tracks with automated status computation
- [x] Seamless Vercel-to-Render API proxy rewrites
- [ ] User Authentication & Multi-Tenancy (Supabase Auth / Clerk)
- [ ] Monthly Financial Health Score
- [ ] CSV & PDF Statement Export
- [ ] Automated Recurring Subscriptions Detection

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve coinBee:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Crafted with 🐝 by the <b>coinBee</b> team.
</p>
