import 'client-only';

import logger from '@my/logger/client';

import { createBffClient } from '#client/internal/browser/adapters/bff-adapter';
import { createFetchClient } from '#client/internal/isomophic/adapters/fetch-adapter';
import { BffClient, Client } from '#client/internal/isomophic/client.types';

// 使用するHTTPクライアント
const transport: Client = createFetchClient(logger);

/**
 * BFFリクエスト用クライアント（クライアントサイド専用）
 */
const bffClient: BffClient = createBffClient(transport);
export default bffClient;
