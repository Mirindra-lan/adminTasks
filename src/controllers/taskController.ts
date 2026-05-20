import { createTask  as insertTask, deleleTask, updateTask, changeState, getAllTask, getTaskById, getTaskByUser, addContributor } from "../models/taskModel.js";
import type { Request, Response } from "express";
import type { taskType } from "../entities/task.js";

export const createTask = async function (req: Request, res: Response) {
    const data = req.body;
    const id = req.userInfo.id;
    const task = {
        title: data.title,
        category: data.category,
        description: data.description,
        user_id: id,
        end_time: data.end_time,
        priority: data.priority
    }
    const result = await insertTask(task);
    if(result) {
        return res.status(201).json({success: "task created"});
    } else {
        return res.json({error: "task creating failed"});
    }
}

export const getMyTasks = async function(req: Request, res: Response) {
    const id = req.params.id.toString();
    const tasks: taskType[] = [];
    const result = await getTaskByUser(id);
    if(result) {
        result.forEach(el => {
            const task = {
                id: el.id,
                title: el.title,
                category: el.category,
                description: el.description,
                createdat: el.createdat,
                state: el.state,
                user_id: el.user_id,
                end_time: el.end_time
            }
            tasks.push(task);
        });
        return res.status(200).json({success: tasks});
    } else {
        return res.json({error: "no tasks"});
    }
}

export const getAllTasks = async function (req: Request, res: Response ) {
    const tasks = await getAllTask();
    if(tasks) {
        return res.json({success: "all task", tasks: tasks});
    } else {
        return res.json({error: "no task found"});
    }
}

export const addContr = async function(req: Request, res: Response) {
    const { contr_id, task_id } = req.body;
    const task = await addContributor(contr_id, task_id);
    if(task) {
        return res.json({success: "adding contributor successfully", task: task});
    } else {
        return res.json({error: "update failed"});
    }
    
}
export const delTask = async function(req: Request, res: Response) {
    const taskId = req.params.taskId;
    const task = await deleleTask(Number(taskId));
    if(task) {
        return res.json({success: "delete task successfully", task: task});
    } else {
        return res.json({error: "delete failed"});
    }
}