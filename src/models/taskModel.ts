import pool from "../core/db.js";
import type { taskType } from "../entities/task.js";
import Task from "../entities/task.js";

export const createTask = async function(task: taskType) {
    try {
        const result = await pool.query("INSERT INTO tasks(title, category, description, user_id, end_time, priority) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
            [task.title, task.category, task.description, task.user_id, task.end_time, task.priority]
        )
        if(result.rowCount && result.rowCount > 0) {
            const task = new Task({...result.rows[0]});
            return task;
        } else {
            return undefined;
        }
    } catch (error) {
        return undefined;
    }
}

export const updateTask = async function(task: taskType, newTask: taskType) {
    try {
        const result = await pool.query("UPDATE tasks SET title=$1, category=$2, description=$3, user_id=$4, end_time=$5 WHERE id=$6 RETURNING *",
            [newTask.title, newTask.category, newTask.description, newTask.user_id, newTask.end_time, task.id]
        )
        if(result.rowCount && result.rowCount > 0) {
            const task = new Task({...result.rows[0]});
            return task;
        } else {
            return undefined;
        }
    } catch (error) {
        return undefined;
    }
}

export const changeState = async function(id: number, newState: string){
    try {
        const result = await pool.query("UPDATE tasks SET state=$1 WHERE id=$2 RETURNING *",
            [newState, id]
        )
        if(result.rowCount && result.rowCount > 0) {
            const task = new Task({...result.rows[0]});
            return task;
        } else {
            return undefined;
        }
    } catch (error) {
        return undefined;
    }

}

export const deleleTask = async function(id: number) {
    try {
        const result = await pool.query("DELETE FROM tasks WHERE id=$1 RETURNING *", [id])
        if(result.rowCount && result.rowCount > 0) {
            const task = new Task({...result.rows[0]});
            return task;
        } else {
            return undefined;
        }
    } catch (error) {
        return undefined;
    }
}

export const getTaskById = async function(id: number) {
    try {
        const result = await pool.query("SELECT * FROM tasks WHERE id=$1", [id])
        if(result.rowCount && result.rowCount > 0) {
            const task = new Task({...result.rows[0]});
            return task;
        } else {
            return undefined;
        }
    } catch (error) {
        return undefined;
    }

}
export const getTaskByUser = async function(id: string) {
    const tasks: Task[] = [];
    try {
        const result = await pool.query("SELECT * FROM tasks WHERE user_id=$1", [id])
        if(result.rowCount && result.rowCount > 0) {
            result.rows.forEach((value) => {
                const task = new Task({...value});
                tasks.push(task);
            })
            return tasks;
        } else {
            return undefined;
        }
    } catch (error) {
        return undefined;
    }

}

export const getAllTask = async function() {
    const tasks: Task[] = [];
    try {
        const result = await pool.query("SELECT * FROM tasks")
        if(result.rowCount && result.rowCount > 0) {
            result.rows.forEach(element => {
                const task = new Task({...element});
                tasks.push(task);
            });
            return tasks;
        } else {
            return undefined;
        }
    } catch (error) {
        return undefined;
    }

}