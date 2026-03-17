//
// クライアントサイド専用 Client
//
import 'client-only';

import { createFetchClient } from '@/presentation/_system/client/internal/client.adapter.fetch';
import { Client, ValidateStatus } from '@/presentation/_system/client/client.types';
import logger from '@/presentation/_system/logging/logger.c';

const defaultValidateStatus: ValidateStatus = (status: number) => status === 200;

const client: Client = createFetchClient(logger, defaultValidateStatus);

export default client;
