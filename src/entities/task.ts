export type taskType = {
    id?: number;
    state?: string;
    title?: string;
    type?: string;
    description?: string;
    user_id?: string;
    start_time?: Date | null;
    end_time?: Date | null;
    createdat?: Date | null;
}

class Task {
    id: number;
    state: string;
    title: string;
    type: string;
    description: string;
    user_id: string;
    start_time: Date | null;
    end_time: Date | null;
    createdat: Date | null;
    constructor({
        id = 0,
        title = "",
        state = "created",
        type = "",
        description = "",
        user_id = "",
        start_time = null,
        end_time = null,
        createdat = null
    }: taskType = {}) {
        this.id = id;
        this.state = state;
        this.title = title;
        this.type = type;
        this.description = description;
        this.user_id = user_id;
        this.start_time = start_time;
        this.end_time = end_time;
        this.createdat = createdat;
    }
    setId (id: number): void {
        this.id = id;
    }
    getId (): number{
        return this.id;
    }

    setState(state: string) {
        this.state = state;
    }
    getState() {
        return this.state;
    }

    setTitle (title: string): void {
        this.title = title;
    }
    getTitle (): string{
        return this.title ;
    }

    setType (type: string): void {
        this.type = type;
    }
    getType (): string{
        return this.type ;
    }

    setDescription (description: string): void {
        this.description = description;
    }
    getDescription (): string{
        return this.description ;
    }

    setUserId (user_id: string): void {
        this.user_id = user_id;
    }
    getUserId (): string{
        return this.user_id ;
    }

    setStartTime (start_time: Date): void {
        this.start_time = start_time;
    }
    getStartTime (): Date | null{
        return this.start_time ;
    }

    setEndTime (end_time: Date): void {
        this.end_time = end_time;
    }
    getEndTime (): Date | null{
        return this.end_time ;
    }

    setCreatedat (createdat: Date): void {
        this.createdat = createdat;
    }
    getCreatedat (): Date | null{
        return this.createdat;
    }
}

export default Task;
