import { TasksStore } from './tasksStore';
import Task from '@/models/task';
import { Guid16 } from '@/types/guid16';
const { remote } = window.require('electron')

export class RemoteTasksStore
{
    tasksStore: TasksStore
    
    constructor()
    {
        this.tasksStore = remote.getGlobal('tasksStore');
    }

    async findOne(id: Guid16): Promise<Task>
    {
        const task: Task = await this.tasksStore.findAsync(id)
        // result.push(Task.cast(tasks[i]));
        return task;
    }

    async findAll(): Promise<Task[]>
    {
        const result = [];
        const tasks = await this.tasksStore.findAllAsync();
        for(let i = 0; i < tasks.length; i++)
        {
            result.push(Task.cast(tasks[i]));
        }
        return result;
    }

    async findFromTo(from: Date, to: Date): Promise<Task[]>
    {
        const result = [];
        const tasks = await this.tasksStore.findFromTo(from, to)
        for(let i = 0; i < tasks.length; i++)
        {
            result.push(Task.cast(tasks[i]));
        }
        return result
    }

    async insert(task: Task): Promise<Task>
    {
        const newTask = await this.tasksStore.insert(task);
        return Task.cast(newTask);
    }

    async update(task: Task)
    {
        await this.tasksStore.update(task);
    }
}