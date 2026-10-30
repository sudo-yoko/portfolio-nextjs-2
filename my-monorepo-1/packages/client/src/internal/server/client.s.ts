//
// サーバーサイド専用 Client
//
import 'server-only';

import { Client } from '#client/internal/isomophic/client.types';
import { axiosClient } from '#client/internal/server/adapters/axios-adapter.s';

/**
 * バックエンドリクエスト用クライアント（サーバーサイド専用）
 */
const client: Client = axiosClient();
export default client;

/**
 * 外部リクエスト用クライアント（サーバーサイド専用、プロキシ設定あり）
 */
export const externalClient: Client = axiosClient();


