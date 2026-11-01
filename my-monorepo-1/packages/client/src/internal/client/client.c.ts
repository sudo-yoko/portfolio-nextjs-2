import 'client-only';

import logger from '@my/logger/client';

import { withBffClientSpec } from '#client/internal/client/bff-client';
import { fetchClient } from '#client/internal/isomophic/adapters/fetch-adapter';
import { Client } from '#client/internal/isomophic/client.types';

/**
 * BFFリクエスト用クライアント（クライアントサイド専用）
 */
const bffClient: Client = getBffClient();
export default bffClient;

function getBffClient(): Client {
    return withBffClientSpec(fetchClient(logger));
}
