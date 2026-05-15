import express from "express";
import http from "node:http";
import "dotenv/config";
import authRoute from "./src/router/authRoute.js";
import cookieParser from "cookie-parser";
import { createServer as createViteServer } from "vite";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { authMiddleware } from "./src/middlewares/authMiddleware.js"; 
import cors from "cors";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
async function runServer() {
    const app = express();
    const server = http.createServer(app);
    const vite = await createViteServer({
        server: {middlewareMode: true},
        appType: "custom"
    })

    let html = await readFile(path.resolve(__dirname, "index.html"), "utf-8");
    
    app.use(express.static(path.join(__dirname, "public")));
    app.use(cors({credentials: true}));
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(cookieParser());
    app.use(vite.middlewares);
    
    app.use(authRoute);
    
    app.use("/app", authMiddleware)
    app.get(/.*/, async (req, res) => {
        try {
            html = await vite.transformIndexHtml(req.originalUrl, html);
            res.setHeader("Content-Type", "text/html");
            res.status(200).end(html);
        } catch (error) {
            vite.ssrFixStacktrace(error as Error);
            res.send(error);
        }
    })
    const PORT = Number(process.env.PORT) || 3002;
    server.listen(PORT, () => {
        console.log("Server running on port ", PORT);
    });
}

runServer();