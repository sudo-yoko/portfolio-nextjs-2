import 'server-only';

import axios from 'axios';

import { consoleHeader } from '@/presentation/_system/console-header';

const logPrefix = 'client.axios.ts: ';

export const axiosInstance = (() => {
    console.log(`${consoleHeader} ${logPrefix} axios instance is created.`);
    return axios.create();
})();
