//
// クライアントサイド専用 Client
//
import 'client-only';

import { createFetchClient } from '@/presentation/_system/client/client.adapter.fetch';
import { Client } from '@/presentation/_system/client/client.types';
import logger from '@/presentation/_system/logging/logger.c';

const client: Client = createFetchClient(logger);

export default client;
