//
// サーバーサイド専用 Client
//
import 'server-only';

import { createClient } from '@/presentation/_system/client/client.factory.s';
import { Client } from '@/presentation/_system/client/client.types';

const client: Client = await createClient('axios');

export default client;
