import express, { Express } from 'express';

(async function() {
    const app: Express = express();
    app.use(express.json());

    const PORT = process.env.PORT;

    const tasksEndpoint = '/api/tasks';

    app.get('/', (req, res) => {
        res.status(200).send('Root');
    });

    // Tasks GET
    app.get(tasksEndpoint, (req, res) => {
        res.status(200).send('Tasks: GET');
    });

    // Tasks POST
    app.post(tasksEndpoint, (req, res) => {
        const { body } = req;

        // communicate to postgres database and update the table with the new task information
        // when done, send request back
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