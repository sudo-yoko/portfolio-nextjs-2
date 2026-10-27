//
// サーバーサイド専用 Client
//
import 'server-only';

import { Client } from '#client/internal/isomophic/client.types';
import { axiosClient } from '#client/internal/server/adapters/axios-adapter';

const client: Client = axiosClient();

export default client;
