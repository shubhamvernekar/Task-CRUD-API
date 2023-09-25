"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TaskController_1 = require("../controller/TaskController");
const router = express_1.default.Router();
router.get("/getAllTasks", TaskController_1.getAllTask);
router.put("/:taskId", TaskController_1.updateTask);
router.get("/getTaskMetrics", TaskController_1.getTaskMetrics);
router.post("/createTask", TaskController_1.createTask);
exports.default = router;
