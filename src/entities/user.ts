enum Role {
  ADMIN = "admin",
  USER = "user",
  CLIENT = "client"
}
export type UserType = {
    email? : string,
    pwd?: string,
    name?: string,
    lastname?: string,
    id?: string,
    role?: Role,
    createdat?: Date | null,
    lastupdatedat?: Date
}

class User {

    id: string;
    email: string;
    pwd: string;
    name: string;
    lastname: string;
    role: Role;
    lastupdatedat: Date;
    createdat: Date | null;

    constructor({
        id = "",
        email = "",
        pwd = "",
        name = "",
        lastname = "",
        role = Role.USER,
        createdat = null,
        lastupdatedat = new Date()
    }: UserType = {}) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.pwd = pwd;
        this.role = role;
        this.lastname = lastname;
        this.lastupdatedat = lastupdatedat;
        this.createdat = createdat;
    }

    setRole(role: Role) {
        this.role = role;
    }
    getRole(): string {
        return this.role;
    }
    setId(id: string): void {
        this.id = id;
    }
    setEmail(email: string): void {
        this.email = email;
    }
    setPwd(pwd: string): void {
        this.pwd = pwd;
    }
    setName(name: string): void {
        this.name = name;
    }
    setLastname(lastname: string): void {
        this.lastname = lastname;
    }
    setLastupdatedat(lastupdatedat: Date): void {
        this.lastupdatedat = lastupdatedat;
    }
    setCreatedat(createdat: Date): void {
        this.createdat = createdat;
    }
    getId(): string {
        return this.id;
    }
    getEmail(): string {
        return this.email;
    }
    getPwd(): string {
        return this.pwd;
    }
    getName(): string {
        return this.name;
    }
    getLastname(): string {
        return this.lastname;
    }
    getFullname(): string {
        return this.name + " " + this.lastname;
    }
    getCreatedat(): Date | null {
        return this.createdat;
    }
    getLastupdatedat(): Date {
        return this.lastupdatedat;
    }
}

export default User;