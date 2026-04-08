import cors from 'cors';
import type { Response } from 'express';
import express from 'express';

const port = 3006;
const path = '/healthcheck';

const app = express();

app.use(cors());

app.get(path, async (_req, res: Response<void>) => {
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Mock server running on http://localhost:${port} (healthcheck)`);
});
