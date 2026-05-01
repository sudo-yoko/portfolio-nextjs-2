import cors from 'cors';
import type { Response } from 'express';
import express from 'express';

import { delay, loggingReq } from '@/__mocks__/utils/express-middlewares';

const logPrefix = 'healthcheck';

const port = 3006;
const path = '/healthcheck';

const app = express();

app.use(cors());
app.use(delay(3000));
app.use(loggingReq(logPrefix));

app.get(path, async (_req, res: Response<void>) => {
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Mock server running on http://localhost:${port} (healthcheck)`);
});
