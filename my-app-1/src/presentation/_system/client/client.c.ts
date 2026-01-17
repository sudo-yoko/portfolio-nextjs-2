import 'client-only';

import { clientImpl } from '@/presentation/_system/client/client.impl.fetch';
import { Client } from '@/presentation/_system/client/client.types';

/**
 * BFF 呼び出しクライアント
 */
const client: Client = clientImpl;

export default client;
