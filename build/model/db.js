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
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dbConfig = {
    user: 'db_username',
    password: 'your_db_password',
    database: 'database_name',
    host: 'localhost',
    port: 5432,
};
const pool = new pg_1.Pool(dbConfig);
function createTask(title, description, status) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "INSERT INTO tasks (title, description, status) VALUES ($1, $2, $3)";
        yield pool.query(query, [title, description, status]);
    });
}
function updateTask(taskId, title, description, status) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "UPDATE tasks SET title = $1, description = $2, status = $3 where id = $4";
        yield pool.query(query, [title, description, status, taskId]);
    });
}
function getAllTasks(page, pageSize) {
    return __awaiter(this, void 0, void 0, function* () {
        const offset = (page - 1) * pageSize;
        const query = 'SELECT * FROM tasks LIMIT $1 OFFSET $2';
        const result = yield pool.query(query, [pageSize, offset]);
        return result.rows;
    });
}
function getTopLevelMertics() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `SELECT
        SUM(CASE WHEN status = 'OPEN' THEN 1 ELSE 0 END) as open_tasks,
        SUM(CASE WHEN status = 'IN_PROGRESS' THEN 1 ELSE 0 END) as inprogress_tasks,
        SUM(CASE WHEN status = 'COMPLETED' THEN 1 ELSE 0 END) as completed_tasks
      FROM
        tasks;
    `;
        const result = yield pool.query(query);
        return result.rows;
    });
}
function getTaskMetrics(page, pageSize) {
    return __awaiter(this, void 0, void 0, function* () {
        const offset = (page - 1) * pageSize;
        const metricsQuery = `
      SELECT
        TO_CHAR(date_time, 'Month YYYY') as date,
        SUM(CASE WHEN status = 'OPEN' THEN 1 ELSE 0 END) as open_tasks,
        SUM(CASE WHEN status = 'IN_PROGRESS' THEN 1 ELSE 0 END) as inprogress_tasks,
        SUM(CASE WHEN status = 'COMPLETED' THEN 1 ELSE 0 END) as completed_tasks
      FROM
        tasks
      GROUP BY
        TO_CHAR(date_time, 'Month YYYY')
      ORDER BY
        date
      LIMIT $1 OFFSET $2;
    `;
        const metricsResult = yield pool.query(metricsQuery, [pageSize, offset]);
        const metrics = metricsResult.rows.map((row) => ({
            date: row.date,
            metrics: {
                open_tasks: row.open_tasks,
                inprogress_tasks: row.inprogress_tasks,
                completed_tasks: row.completed_tasks,
            },
        }));
        return { metrics };
    });
}
exports.default = {
    createTask,
    updateTask,
    getAllTasks,
    getTopLevelMertics,
    getTaskMetrics
};
