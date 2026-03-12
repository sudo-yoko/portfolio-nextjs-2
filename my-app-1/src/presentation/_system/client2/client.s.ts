//
// サーバーサイド専用 Client
//
import 'server-only';

import { getClient } from '@/presentation/_system/client2/client.factory.s';
import { Client } from '@/presentation/_system/client/client.types';

const client: Client = await getClient('axios');

export default client;
