import {Request, Response} from "express";
import db from "../model/DB";

export const createTask = async (req: Request, res: Response) => {
    try {
        const { title, description, status } = req.body;
        await db.createTask(title, description, status)
        res.status(200).json({message: "Task create successfully"});
    } catch (error) {
        res.status(500).json({error: "Fail to create Task"});
    }
}

export const updateTask = async (req: Request, res: Response) => {
    try {
        const taskId: number = parseInt(req.params.taskId, 10);
        const { title, description, status } = req.body;
        await db.updateTask(taskId, title, description, status);
        res.status(200).json({message: "Task updated successfully"});
    } catch (error) {
        res.status(500).json({error: "Fail to update Task"});
    }
}

export const getAllTask = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page?.toString() || '1', 10);
        const pageSize = parseInt(req.query.pageSize?.toString() || '10', 10);
        let result = await db.getAllTasks(page, pageSize);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({error: "Fail to get Tasks"});
    }
}

interface MetricResult {
    metricSummery?: any;
    monthlyMetric?: any;
}

export const getTaskMetrics = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page?.toString() || '1', 10);
        const pageSize = parseInt(req.query.pageSize?.toString() || '10', 10);
        const result: MetricResult = {};

        if(page == 1) {
            let topMetrics = await db.getTopLevelMertics();
            result.metricSummery = topMetrics[0];
        }
        let rows = await db.getTaskMetrics(page, pageSize);
        result.monthlyMetric = rows;
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({error: "Fail to fetch task metric"});
    }
}
