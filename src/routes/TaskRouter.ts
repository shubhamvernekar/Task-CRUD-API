import express, { Request, Response } from 'express';
import {getAllTask, createTask, getTaskMetrics, updateTask} from '../controller/TaskController';
const router = express.Router();

router.get("/getAllTasks", getAllTask);

router.put("/:taskId", updateTask);

router.get("/getTaskMetrics", getTaskMetrics);

router.post("/createTask", createTask);

export default router;