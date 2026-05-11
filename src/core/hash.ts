import crypto from "node:crypto";

const SALT = process.env.SALT || "123456789";

export const sign = function sign(data: string): string {
    const pass = crypto.createHmac("sha512", SALT).update(data).digest("hex");
    return pass;
}

export const verify = function (data: string, pass: string): boolean {
    const hash = sign(data);
    if(pass === hash) {
        return true;
    } else {
        return false;
    }
}
