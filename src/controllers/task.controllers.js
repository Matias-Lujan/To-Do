import { Task } from "../models/task.models";
import { TaskDataBaseRepository } from "../repository/task.repository";

const database = new TaskDataBaseRepository('database/task.db.json');

export const TaskController = {
    getById: async (req, res) => {
        const id = req.params.id;
        console.log(`ID enviado x parametro -> ${id}`)

        try {
            const responseData = await database.getById(id);

            res.json({
                status: 200,
                OK: true,
                message: 'Existe la tarea',
                playload: responseData
            }
            );
        } catch (error) {
            res.json({
                status: 400,
                OK: false,
                message: `No existe tarea para ID -> ${id}`
            });
            return;
        }
    },

    createTask: async (req, res) => {
        const {id, userId, tittle, description, status} = req.body;

        const newTask = new Task(id, userId, tittle, description, status);
        const result = await database.createTask(newTask);

        res.json({
            status: 200,
            OK: true,
            message: 'Tarea creada',
            payload: result
        }
        );
        return
    },

    deleteTask: async (req, res) => {
        const {id} = req.params;

        try {
            const task = await database.getById(id);

            database.deleteTask(task);

            res.json({
                status: 200,
                OK: true,
                message: `Tarea ID -> ${task.id} eliminado de la base de datos`
            }
            );
        } catch (error) {
            res.json({
                status: 400,
                OK: false,
                message: error.message
            })
            return;
        }
    },

    updateTask: async (req, res) => {
        const {id} = req.params;
        const {description, status} = req.body;

        try {
            const task = await database.getById(id);

            task.description = description;
            task.status = status;

            const {oldDataTask, newDataTask} = await database.updateTask(task);

            res.json({
                status: 200,
                OK: true,
                oldDataTask,
                newDataTask
            });
        } catch (error) {
            res.json({
                status: 400,
                OK: false,
                message: error.message
            });
            return;
        }
    }
}