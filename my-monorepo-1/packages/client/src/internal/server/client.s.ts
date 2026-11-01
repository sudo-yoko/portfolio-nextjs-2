//
// バックエンドリクエスト用クライアント（サーバーサイド専用）
//
import 'server-only';

import logger from '@my/logger/server';

import { createFetchClient } from '#client/internal/isomophic/adapters/fetch-adapter';
import { Client } from '#client/internal/isomophic/client.types';

/**
 * バックエンドリクエスト用クライアント（サーバーサイド専用）
 */
const backendClient: Client = createFetchClient(logger);
export default backendClient;
