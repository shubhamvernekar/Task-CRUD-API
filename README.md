# Task-CRUD-API
Task crud apis using postgres and nodejs

# DB setup
1. install postsql in system.
2. create db in postsql
    CREATE DATABASE task_db;
3. conncet to db
4. create table
    CREATE TABLE tasks (
        ID SERIAL PRIMARY KEY,
        title VARCHAR(30) NOT NULL,
        desc VARCHAR(100) NOT NULL,
        status VARCHAR(20) NOT NULL,
        date_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
    );
5. update with your database info in "src/model/DB.ts"
    ```
    const dbConfig = {
        user: 'db_username',
        password: 'your_db_password',
        database: 'database_name',
        host: 'localhost',
        port: 5432,
    };
    ```

# Api's
1. Base URL http://localhost:3000

2. API to create a task.
    POST /api/task/createTask
    Request Body: 
    ```
    {
        "title": "task 2 finish the fast",
        "description": "need to finish this ASAP",
        "status": "OPEN"
    }
    ```
    Response Body:
    ```
    {
        "message": "Task create successfully"
    }
    ```
    
3. API to update a task
    PUT /api/task/:taskId
    Request Body:
    ```
    {
        "title": "updated task finish the fast",
        "description": "need to finish this ASAP",
        "status": "OPEN"
    }
    ```
    Response Body:
    ```
    {
        "message": "Task updated successfully"
    }
    ```

4. API to get all tasks.
    GET /api/task/getAllTasks?page=<page_no>&pageSize=<page_size>
    Response Body:
    ```
    [
        ...
        ...
        {
            "id": 10,
            "title": "task 2 finish the fast",
            "description": "need to finish this ASAP",
            "status": "OPEN",
            "date_time": "2023-09-25T12:30:50.398Z"
        }
    ]
    ```

5. API to get task metrics.
    GET /api/task/getTaskMetrics?page=<page_no>&pageSize=<page_size>
    Respose Body:
    ```
    {
        "metricSummery": {
            "open_tasks": "3",
            "inprogress_tasks": "1",
            "completed_tasks": "3"
        },
        ...
        ...
        "monthlyMetric": {
            "metrics": [
                {
                    "date": "September 2023",
                    "metrics": {
                        "open_tasks": "3",
                        "inprogress_tasks": "1",
                        "completed_tasks": "3"
                    }
                }
            ]
        }
    }
    ```


# Run server
1. In dev
    npm run dev
2. In prod
    npm run build
    npm run start