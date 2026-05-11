import type { Request, Response, NextFunction } from "express";
import  { verify as verifyToken} from "jsonwebtoken"

const SALT = process.env.SALT || '123456789'
export const authMiddleware = function (req: Request, res: Response, next: NextFunction) {
    if(req.cookies("token")) {
        const decoded = verifyToken(req.cookies("token"), SALT);
        req.userInfo = decoded;
        return next();
    } else {
        return res.redirect("/login");
    }

}