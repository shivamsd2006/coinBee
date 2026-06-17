import express from 'express'
import cors from 'cors'
const app = express();
const port = 5173;
app.use(cors({ origin: 'http://localhost:5173' }));
import {expens} from 



app.get("/expense.Routes", (req, res) => {
  res.send('sendin to routes')

})


app.get("/income.Routes", (req, res) => {
  res.send('sendin to routes')

})


app.listen(port, () => {
  console.log(`server is running on http:localhost:${port}`);
});

export { index }