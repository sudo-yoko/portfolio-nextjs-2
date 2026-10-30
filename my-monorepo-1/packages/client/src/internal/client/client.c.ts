//
// クライアントサイド専用 Client
//
import 'client-only';

import { bffFetchClient } from '#client/internal/client/adapters/fetch-adapter.c';
import { externalFetchClient } from '#client/internal/client/adapters/fetch-adapter.c.external';
import { Client } from '#client/internal/isomophic/client.types';

/**
 * BFFリクエスト用クライアント（クライアントサイド専用）
 */
const bffClient: Client = bffFetchClient();
export default bffClient;

/**
 * 外部リクエスト用クライアント（クライアントサイド専用）
 */
export const externalClient: Client = externalFetchClient();
