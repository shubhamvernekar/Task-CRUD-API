"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTaskMetrics = exports.getAllTask = exports.updateTask = exports.createTask = void 0;
const DB_1 = __importDefault(require("../model/DB"));
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, status } = req.body;
        yield DB_1.default.createTask(title, description, status);
        res.status(200).json({ message: "Task create successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Fail to create Task" });
    }
});
exports.createTask = createTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = parseInt(req.params.taskId, 10);
        const { title, description, status } = req.body;
        yield DB_1.default.updateTask(taskId, title, description, status);
        res.status(200).json({ message: "Task updated successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Fail to update Task" });
    }
});
exports.updateTask = updateTask;
const getAllTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const page = parseInt(((_a = req.query.page) === null || _a === void 0 ? void 0 : _a.toString()) || '1', 10);
        const pageSize = parseInt(((_b = req.query.pageSize) === null || _b === void 0 ? void 0 : _b.toString()) || '10', 10);
        let result = yield DB_1.default.getAllTasks(page, pageSize);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ error: "Fail to get Tasks" });
    }
});
exports.getAllTask = getAllTask;
const getTaskMetrics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        const page = parseInt(((_c = req.query.page) === null || _c === void 0 ? void 0 : _c.toString()) || '1', 10);
        const pageSize = parseInt(((_d = req.query.pageSize) === null || _d === void 0 ? void 0 : _d.toString()) || '10', 10);
        const result = {};
        if (page == 1) {
            let topMetrics = yield DB_1.default.getTopLevelMertics();
            result.metricSummery = topMetrics[0];
        }
        let rows = yield DB_1.default.getTaskMetrics(page, pageSize);
        result.monthlyMetric = rows;
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ error: "Fail to fetch task metric" });
    }
});
exports.getTaskMetrics = getTaskMetrics;
