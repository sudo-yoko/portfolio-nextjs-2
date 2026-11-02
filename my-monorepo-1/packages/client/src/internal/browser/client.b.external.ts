import 'client-only';

import logger from '@my/logger/client';

import { createFetchClient } from '#client/internal/isomorphic/adapters/fetch-adapter';
import { Client } from '#client/internal/isomorphic/client.types';

/**
 * 外部リクエスト用クライアント（クライアントサイド専用）
 */
const externalClient: Client = createFetchClient(logger);
export default externalClient;
