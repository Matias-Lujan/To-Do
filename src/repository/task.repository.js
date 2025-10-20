import fs from 'fs/promises'
import { Task } from '../models/task.models';

export class TaskDataBaseRepository {
    constructor(path) {
        this.path = path;
    }

    async getAllData() {
        const data = await fs.readFile(this.path, {encoding: 'utf8'});
        return await JSON.parse(data)
    }

    async getById(id) {
        let data = await this.getAllData();
        if (!data) throw error('No hay datos');

        const filteredData = data.filter((task) => task.id == id);
        if (!filteredData || filteredData.length === 0)
            throw error(`No existe la tarea ID -> ${idParam}`)
        const objectPlain = filteredData[0];

        const task = new Task(objectPlain.id, objectPlain.userId, objectPlain.tittle, objectPlain.description, objectPlain.status);

        return task;
    }

    async createTask(task) {
        let data = await this.getAllData();

        data.push(task);

        await fs.writeFile(this.path, JSON.stringify(data, null, 2));

        return {
            id: task.id
        }
    }

    async deleteTask(task) {
        const {id} = task;

        let filteredData = data.filter((task) => task.id !== id);

        await fs.writeFile(this.path, JSON.stringify(filteredData, null, 2));

        return {
            idTask: id
        }
    }

    async updateTask(task) {
        const {id} = task;

        let data = await this.getAllData();
        const filteredData = data.filter((task) => task.id !== id);
        const oldDataTask = data.filter((task) => task.id == id);

        filteredData.push(task);

        await fs.writeFile(this.path, JSON.stringify(filteredData, null, 2));

        return {oldDataTask, newDataTask: task};
    }
}
