import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";

interface TaskRequest extends Request<{
    id: string;
}, any, any, qs.ParsedQs, Record<string, any>> { }

export class TaskRoutes {
    _prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this._prisma = prisma;
        this._prisma.$connect();
    }

    getAllTasks = async (req: Request, res: Response) => {
        const tasks = this._prisma.task.findMany();

        res.status(200).json(tasks);
    }

    getTaskById = async (req: TaskRequest, res: Response) => {
        try {
            const id = { id: req.params.id };
            const task = await this._prisma.task.findUnique({ where: id });

            res.status(200).json(task);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    createTask = async (req: TaskRequest, res: Response) => {
        try {
            const { title, duration, startTime, endTime, date } = req.body;
            const data = { title, duration, startTime, endTime, date };

            const createdTask = await this._prisma.task.create({ data });

            res.status(201).json(createdTask);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    updateTask = async (req: TaskRequest, res: Response) => {
        try {
            const { title, duration } = req.body;
            const data = { title, duration };
            const id = { id: req.params.id };

            const updatedTask = await this._prisma.task.update({ where: id, data });

            res.status(201).json(updatedTask);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    deleteTask = async (req: TaskRequest, res: Response) => {
        try {
            const id = { id: req.params.id };
            const task = await this._prisma.task.delete({ where: id });

            res.status(200).json(task);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}