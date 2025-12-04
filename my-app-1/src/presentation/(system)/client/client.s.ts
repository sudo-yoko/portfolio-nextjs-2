import 'server-only';

import { clientImpl } from '@/presentation/(system)/client/client.impl.axios';
import { Client } from '@/presentation/(system)/client/client.types';

/**
 * バックエンド呼び出しクライアント
 */
const client: Client = clientImpl;

export default client;
