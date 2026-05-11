import type { Response, Request } from "express";
import User from "../entities/user.js";
import { createUser as insertUser } from "../models/userModel.js";

export const createUser =  async function (req: Request, res: Response): Promise<any> {
    const data = req.body;
    const user = new User({
        name: data?.name,
        lastname: data?.lastname,
        email: data?.email,
        pwd: data?.pwd
    });
    const result = await insertUser(user);
    if(result) {
        return res.status(201).json({success: "User created successfully"});
    } else {
        return res.json({error: "create user failed"});
    }
}