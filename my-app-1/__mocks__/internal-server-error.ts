import cors from 'cors';
import type { Response } from 'express';
import express from 'express';

import { delay, loggingReq } from '@/__mocks__/utils/express-middlewares';

const logPrefix = 'internal-server-error.ts';

const port = 3007;
const path = '/internal-server-error';

const app = express();

app.use(cors());
app.use(delay(3000));
app.use(loggingReq(logPrefix));

app.get(path, async (__req, res: Response<void>) => {
    res.sendStatus(500);
});

app.listen(port, () => {
    console.log(`Mock server running on http://localhost:${port} (internal-server-error)`);
});
