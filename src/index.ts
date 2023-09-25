import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import TaskRouter from './routes/TaskRouter';
const app: Express = express();

app.use(bodyParser.json());

app.use("/api/task", TaskRouter);

app.listen(3000, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${3000}`);
});