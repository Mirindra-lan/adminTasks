import pool from "../core/db.js";
import User from "../entities/user.js";
import type { UserType } from "../entities/user.js";

export const createUser = async function createUser(user: UserType): Promise<User | null> {
    try {
        const result = await pool.query("INSERT INTO users(email, pwd, name, lastname) VALUES($1,$2,$3,$4) RETURNING *",
            [user.email, user.pwd, user.name, user.lastname]
        );
        if(result.rowCount && result.rowCount > 0) {
            const data = result.rows[0];
            const usr = new User({
                id: data.id,
                ...user
            })
            return usr;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const updateUser = async function (user: User, newUser: User): Promise<User | null> {
    try {
        const result = await pool.query("UPDATE users SET name=$1, lastname=$2, lastupdatedat=$3 WHERE id=$4  RETURNING *",
            [newUser.name, newUser.lastname, newUser.lastupdatedat, user.id]
        );
        if(result.rowCount && result.rowCount > 0) {
            const data = result.rows[0];
            user.setId(data.id);
            user.setCreatedat(data.createdat);
            user.setLastupdatedat(data.lastupdatedat);
            user.setName(data.name);
            user.setLastname(data.lastname);
            return user;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getUserByEmail = async function (email: string): Promise<User | null> {
    try {
        const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
        if(result.rowCount && result.rowCount > 0) {
            const data = result.rows[0];
            const usr = new User({
                id: data.id,
                name: data.name,
                lastname: data.lastname,
                email: data.email,
                pwd: data.pwd,
                role: data?.role,
                createdat: data.createdat,
                lastupdatedat: data.lastupdatedat
            })
            return usr;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}

export const getUserById = async function (id: string): Promise<User | null> {
    try {
        const result = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
        if(result.rowCount && result.rowCount > 0) {
            const data = result.rows[0];
            const usr = new User({
                id: data.id,
                name: data.name,
                lastname: data.lastname,
                email: data.email,
                pwd: data.pwd,
                role: data?.role,
                createdat: data.createdat,
                lastupdatedat: data.lastupdatedat
            })
            return usr;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}

export const getAllUsers = async function (): Promise<User[] | null> {
    const users: User[] = [];
    try {
        const result = await pool.query("SELECT * FROM users");
        if(result.rowCount && result.rowCount > 0) {
            const data = result.rows;
            data.forEach(element => {
                const usr = new User({
                    id: element.id,
                    name: element.name,
                    lastname: element.lastname,
                    email: element.email,
                    pwd: element.pwd,
                    role: element?.role,
                    createdat: element.createdat,
                    lastupdatedat: element.lastupdatedat
                })
                users.push(usr)
            });
            return users;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}

export const deleteUserById = async function (id: string): Promise<User | null> {
    try {
        const result = await pool.query("DELETE FROM users WHERE id=$1 RETURNING *", [id]);
        if(result.rowCount && result.rowCount > 0) {
            const data = result.rows[0];
            const usr = new User({
                id: data.id,
                name: data.name,
                lastname: data.lastname,
                email: data.email,
                pwd: data.pwd,
                role: data?.role,
                createdat: data.createdat,
                lastupdatedat: data.lastupdatedat
            })
            return usr;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}