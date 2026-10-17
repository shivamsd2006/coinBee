import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 5000;

// __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS: in production the frontend is served from the same origin,
// so CORS isn't even needed — but we keep it for dev convenience.
const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
app.use(cors({ origin: allowedOrigin }));

import {expenseRoutes} from './src/Routes/expense.Routes'
import{incomeRoutes} from './src/Routes/income.Routes'
import{budgetRoutes} from'./src/Routes/budget.Routes'
  

app.use(express.json());
app.use("/api/expenseRoutes",expenseRoutes);
app.use("/api/incomeRoutes",incomeRoutes);
app.use("/api/budgetRoutes",budgetRoutes);

// ── Serve Frontend in production ──────────────────────────────
// After `npm run build` in the Frontend folder, the static files
// land in Frontend/dist. We serve them here so a single Render
// "Web Service" handles both the API and the UI.
const frontendDist = path.join(__dirname, '..', 'Frontend', 'dist');
app.use(express.static(frontendDist));

// Any route that isn't an /api/* route gets index.html,
// so React Router can handle client-side navigation.
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDist, 'index.html'));
});

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
