import express from 'express';

(async function() {
    const app = express();
    app.use(express.json());

    const PORT = process.env.PORT;

    // Tasks
    app.post('/api/tasks', (req, res) => {
        const { body } = req;

        // communicate to postgres database and update the table with the new task information
        // when done, send request back
    });

    app.listen(PORT, () => {
        console.log(`Port: ${PORT}`)
    });
})();