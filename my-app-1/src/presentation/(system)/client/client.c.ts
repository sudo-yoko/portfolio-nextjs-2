import 'client-only';

import { clientImpl } from '@/presentation/(system)/client/client.impl.fetch';
import { Client } from '@/presentation/(system)/client/client.types';

/**
 * BFF 呼び出しクライアント
 */
const client: Client = clientImpl;

export default client;
