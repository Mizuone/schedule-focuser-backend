import express, { Express } from 'express';

import { PrismaClient } from '@prisma/client';
import { TaskRoutes } from './routes/tasks';

(async function() {
    const PORT = process.env.PORT;
    const app: Express = express();
    const prisma = new PrismaClient();

    const taskRoutes = new TaskRoutes(prisma);

    app.use(express.json());

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });

    const taskEndpoint = '/api/task';

    app.get(taskEndpoint, taskRoutes.getAllTasks);
    app.get(`${taskEndpoint}/:id`, taskRoutes.getTaskById);
    app.post(taskEndpoint, taskRoutes.createTask);
    app.put(`${taskEndpoint}/:id`, taskRoutes.updateTask);
    app.delete(`${taskEndpoint}/:id`, taskRoutes.deleteTask);

    process.on("SIGINT", function onSigint() {
        console.info(
            "Got SIGINT (aka ctrl-c in docker). Graceful shutdown ",
            new Date().toISOString()
        );
        shutdown();
    });

    process.on("SIGTERM", function onSigterm() {
        console.info(
            "Got SIGTERM (docker container stop). Graceful shutdown ",
            new Date().toISOString()
        );
        shutdown();
    });

    const server = app.listen(PORT, () => {
        console.log(`Port: ${PORT}`)
    });

    function shutdown() {
        server.close(function onServerClosed(err: any) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            process.exit(0);
        });
    }
})();