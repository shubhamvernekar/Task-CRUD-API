import { Pool, PoolClient } from 'pg';

const dbConfig = {
    user: 'db_username',
    password: 'your_db_password',
    database: 'database_name',
    host: 'localhost',
    port: 5432,
  };

const pool = new Pool(dbConfig);

interface TaskFiels {
    title: string,
    description: string,
    status: string,
    date_time: Date
}

async function createTask(title: string, description: string, status: string): Promise<void> {
    const query: string = "INSERT INTO tasks (title, description, status) VALUES ($1, $2, $3)";
    await pool.query(query, [title, description, status]);
}

async function updateTask(taskId: number, title: string, description: string, status: string) {
    const query: string = "UPDATE tasks SET title = $1, description = $2, status = $3 where id = $4";
    await pool.query(query, [title, description, status, taskId]);
}

async function getAllTasks(page: number, pageSize: number): Promise<any[]> {
    const offset: number = (page - 1) * pageSize;
    const query: string = 'SELECT * FROM tasks LIMIT $1 OFFSET $2';
    const result = await pool.query(query, [pageSize, offset]);
    return result.rows;
}

async function getTopLevelMertics(): Promise<any[]> {
    const query: string = `SELECT
        SUM(CASE WHEN status = 'OPEN' THEN 1 ELSE 0 END) as open_tasks,
        SUM(CASE WHEN status = 'IN_PROGRESS' THEN 1 ELSE 0 END) as inprogress_tasks,
        SUM(CASE WHEN status = 'COMPLETED' THEN 1 ELSE 0 END) as completed_tasks
      FROM
        tasks;
    `;
    const result = await pool.query(query);
    return result.rows;
}

async function getTaskMetrics(page: number, pageSize: number): Promise<{ metrics: any[] }> {
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

    const metricsResult = await pool.query(metricsQuery, [pageSize, offset]);
  
    const metrics = metricsResult.rows.map((row) => ({
      date: row.date,
      metrics: {
        open_tasks: row.open_tasks,
        inprogress_tasks: row.inprogress_tasks,
        completed_tasks: row.completed_tasks,
      },
    }));
  
    return { metrics };
}

export default  {
    createTask,
    updateTask,
    getAllTasks,
    getTopLevelMertics,
    getTaskMetrics
}