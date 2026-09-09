import cors from 'cors';
import express, { Response } from 'express';

import { delay, loggingReq } from '@/mocks/utils/express-middlewares';
import { consoleHeader } from '@/presentation/_system/logging/logging.utils';

const logPrefix = 'zipcloud';

const port = 3007;
const path = '/zipcloud';

const app = express();

app.use(cors());
app.use(delay(3000));
app.use(loggingReq(logPrefix));

app.get(path + '/internal-server-error', async (_req, res: Response<string>) => {
    res.status(500).send('<HTML>INTERNAL SERVER ERROR!</HTML>');
});

app.listen(port, () => {
    console.log(`${consoleHeader} Mock server running on http://localhost:${port} (zipcloud)`);
});
