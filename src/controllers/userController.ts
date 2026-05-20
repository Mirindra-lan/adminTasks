import type { Response, Request } from "express";
import User from "../entities/user.js";
import { createUser as insertUser, updateUser, updateUserWithPass, getAllUsers } from "../models/userModel.js";
import { verify, sign } from "../core/hash.js";

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

export const getUser = async (req: Request, res: Response) => {
    if(req.userInfo) {
        res.json({success: req.userInfo});
    } else {
        res.json({error: "error on database"});
    }
}

export const updateUserC = async function(req: Request, res: Response) {
    const data = req.body;
    const user = new User(data)
    const newUser = new User({
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        lastupdatedat: new Date()
    });
    if(data.newpwd !== "") {
        if(verify(data.pwd, req.userInfo.pwd)) {
            newUser.setPwd(sign(data.newpwd));
            const result = await updateUserWithPass(user, newUser);
            if(result) {
                return res.json({success: "updated with pwd"});
            } else {
                return res.json({error: "update failed"});
            }
        }  else {
            return res.json({error: "wrong password"});
        }
    } else {
        const result = await updateUser(user, newUser);
        if(result) {
            return res.json({success: "updated"});
        } else {
            return res.json({error: "update failed"});
        }
    }
}

export const allUsers = async function(req: Request, res: Response) {
    const users = await getAllUsers();
    if(users) {
        res.json({success: "get users successfully", users: users});
    } else {
        res.json({error: "failed to load users"});
    }
}