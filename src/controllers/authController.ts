import type { Response, Request } from "express";
import { verify, sign } from "../core/hash.js";
import { getUserByEmail, createUser as insertUser } from "../models/userModel.js";
import jwt from "jsonwebtoken";

const SALT = process.env.SALT || '123456789'
export const login = async function login(req: Request, res: Response): Promise<any> {
    const data = req.body;
    const email = data.email;
    const pwd = data.pwd;
    const user = await getUserByEmail(email);
    if(user) {
        const isMatchPass = verify(pwd, user.pwd);
        if(isMatchPass) {
            const token = jwt.sign({
                id: user.id,
                email: user.email,
                pwd: user.pwd,
                name: user.name,
                lastname: user.lastname,
                role: user.role,
                createdat: user.createdat,
                lastupdatedat: user.lastupdatedat
            }, SALT);
            res.cookie("token", token);
            return res.status(200).json({success: "logged in", email: user.email});
        } else {
            return res.json({error: "wrong password"});
        }
    } else {
        return res.json({error: "email doesn't exist"});
    }
}

export const logout = function (req: Request, res: Response): void {
    res.clearCookie("token");
    res.json({success: "logout success"});
}


export const createUser =  async function (req: Request, res: Response): Promise<any> {
    const data = req.body;
    const user = {
        name: data?.name,
        lastname: data?.lastname,
        email: data?.email,
        pwd: sign(data.pwd)
    };
    const result = await insertUser(user);
    if(result) {
        return res.status(201).json({success: "User created successfully"});
    } else {
        return res.json({error: "create user failed"});
    }
}