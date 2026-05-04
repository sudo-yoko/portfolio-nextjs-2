//
// クライアントサイド専用 Client
//
import 'client-only';

import { Client } from '@/presentation/_system/client/client.types';
import { fetchClient } from '@/presentation/_system/client/internal/client.adapter.fetch';

const client: Client = fetchClient();

export default client;
