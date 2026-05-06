//
// サーバーサイド専用 Client
//
import 'server-only';

import { loadClient } from '@/presentation/_system/client/client.factory.s';
import { Client } from '@/presentation/_system/client/client.types';

const client: Client = await loadClient('axios');

export default client;
