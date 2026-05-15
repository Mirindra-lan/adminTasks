import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
// import { TokenExpiredError, NotBeforeError, JsonWebTokenError } from "jsonwebtoken"

const SALT = process.env.SALT || '123456789'
export const authMiddleware = function (req: Request, res: Response, next: NextFunction) {
    if(req.cookies.token) {
        try {
            const decoded = jwt.verify(req.cookies.token, SALT);
            req.userInfo = decoded;
            return next();
        } catch (err: unknown ) {
            return res.redirect("/login");
            // if (err instanceof jwt.TokenExpiredError) {
            //     // TS sait que err est TokenExpiredError ici
            //     console.log(err.expiredAt); // typé correctement
            //     return res.status(401).json({ error: 'Session expirée' });

            // } else if (err instanceof jwt.NotBeforeError) {
            //     console.log(err.date);
            //     return res.status(401).json({ error: 'Token pas encore actif' });

            // } else if (err instanceof jwt.JsonWebTokenError) {
            //     // TokenExpiredError hérite de JsonWebTokenError
            //     // donc ce cas attrape tout le reste JWT
            //     console.log(err.message);
            //     return res.status(401).json({ error: 'Token invalide' });

            // } else if (err instanceof Error) {
            //     // Erreur générique non-JWT
            //     console.log(err.message);
            //     return res.status(500).json({ error: 'Erreur serveur' });

            // } else {
            //     // Cas extrême : throw d'une string, d'un objet, etc.
            //     return res.status(500).json({ error: 'Erreur inconnue' });
            // }
        }
    } else {
        return res.redirect("/login");
    }

}