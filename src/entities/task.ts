export type taskType = {
    id?: number;
    state?: string;
    title?: string;
    category?: string;
    description?: string;
    user_id?: string;
    priority?: string;
    end_time?: Date | null;
    createdat?: Date | null;
    contributor?: string;
}

class Task {
    id: number;
    state: string;
    title: string;
    category: string;
    description: string;
    user_id: string;
    contributor: string;
    priority: string;
    end_time: Date | null;
    createdat: Date | null;
    constructor({
        id = 0,
        title = "",
        state = "created",
        category = "",
        description = "",
        user_id = "",
        contributor = "",
        priority = "Mid",
        end_time = null,
        createdat = null
    }: taskType = {}) {
        this.id = id;
        this.contributor = contributor;
        this.state = state;
        this.title = title;
        this.priority = priority;
        this.category = category;
        this.description = description;
        this.user_id = user_id;
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
        this.category = type;
    }
    getType (): string{
        return this.category ;
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

    setPriority(pr: string) {
        this.priority = pr;
    }
    getPriority(): string {
        return this.priority
    }
}

export default Task;
