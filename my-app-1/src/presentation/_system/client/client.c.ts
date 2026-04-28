//
// クライアントサイド専用 Client
//
import 'client-only';

import { defaultValidateStatusClient } from '@/presentation/_system/client/client.constants';
import { Client } from '@/presentation/_system/client/client.types';
import { createFetchClient } from '@/presentation/_system/client/internal/client.adapter.fetch';
import logger from '@/presentation/_system/logging/logger.c';

const client: Client = createFetchClient(logger, defaultValidateStatusClient);

export default client;
