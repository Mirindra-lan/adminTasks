import { Pool } from "pg";

const USR = process.env.PG_USER || "postgres";
const PWD = process.env.PG_PASS || "";
const HOST = process.env.PG_HOST || "localhost";
const PORT = Number(process.env.PG_PORT) || 5432;
const DB = process.env.PG_DB || "postgres";

const pool = new Pool({
    user: USR,
    password: PWD,
    host: HOST,
    port: PORT,
    database: DB
})

export default pool;