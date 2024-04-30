import express, { Express } from 'express';

import { TaskRoutes } from './routes/tasks';
import { createServer } from 'node:http';
import { createYoga } from 'graphql-yoga';
import { prisma } from './db';
import { schema } from './schema';

(async function() {
    const PORT = process.env.PORT;
    // const app: Express = express();
    const yoga = createYoga({
        schema
    })

    await prisma.$connect()

    // const taskRoutes = new TaskRoutes(prisma);

    /*
    app.use(express.json());

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });

    const taskEndpoint = '/api/task';
    */
    /*app.get(taskEndpoint, taskRoutes.getAllTasks);
    app.get(`${taskEndpoint}/:id`, taskRoutes.getTaskById);
    app.post(taskEndpoint, taskRoutes.createTask);
    app.put(`${taskEndpoint}/:id`, taskRoutes.updateTask);
    app.delete(`${taskEndpoint}/:id`, taskRoutes.deleteTask);
    */
    const server = createServer(yoga);

    server.listen(PORT, () => {
        console.log(`Port: ${PORT}, running at http://localhost:${PORT}/graphql`)
    });

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