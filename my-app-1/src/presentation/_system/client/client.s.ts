//
// サーバーサイド専用 Client
//
import 'server-only';

import { clientImpl } from '@/presentation/_system/client/client.impl.axios';
import { Client } from '@/presentation/_system/client/client.types';

const client: Client = clientImpl;

export default client;
