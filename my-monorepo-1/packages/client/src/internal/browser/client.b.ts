import 'client-only';

import logger from '@my/logger/client';

import { createBffClient } from '#client/internal/browser/adapters/bff-adapter';
import { createFetchClient } from '#client/internal/isomorphic/adapters/fetch-adapter';
import { BffClient, Client } from '#client/internal/isomorphic/client.types';

// 使用するHTTPクライアント
const client: Client = createFetchClient(logger);

/**
 * BFFリクエスト用クライアント（クライアントサイド専用）
 */
const bffClient: BffClient = createBffClient(client);
export default bffClient;
