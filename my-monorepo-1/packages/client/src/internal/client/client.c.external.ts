import 'client-only';

import logger from '@my/logger/client';

import { fetchClient } from '#client/internal/isomophic/adapters/fetch-adapter';
import { Client } from '#client/internal/isomophic/client.types';

/**
 * 外部リクエスト用クライアント（クライアントサイド専用）
 */
export const externalClient: Client = fetchClient(logger);
