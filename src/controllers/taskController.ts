import { createTask  as insertTask, deleleTask, updateTask, changeState, getAllTask, getTaskById, getTaskByUser } from "../models/taskModel.js";
import type { Request, Response } from "express";
import type { taskType } from "../entities/task.js";

export const createTask = async function (req: Request, res: Response) {
    const data = req.body;
    const task = {
        title: data.title,
        type: data.type,
        description: data.description,
        user_id: data.user_id,
        start_time: data.start_time,
        end_time: data.end_time
    }
    const result = await insertTask(task);
    if(result) {
        return res.status(201).json({success: "task created"});
    } else {
        return res.json({error: "task creating failed"});
    }
}

export const getTasks = async function(req: Request, res: Response) {
    const id = req.params.id.toString();
    const tasks: taskType[] = [];
    const result = await getTaskByUser(id);
    if(result) {
        result.forEach(el => {
            const task = {
                id: el.id,
                title: el.title,
                type: el.type,
                description: el.description,
                createdat: el.createdat,
                state: el.state,
                user_id: el.user_id,
                start_time: el.start_time,
                end_time: el.end_time
            }
            tasks.push(task);
        });
        return res.status(200).json({success: tasks});
    }
}