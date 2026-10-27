//
// クライアントサイド専用 Client
//
import 'client-only';

import { fetchClient } from '#client/internal/client/adapters/fetch-adapter';
import { Client } from '#client/internal/isomophic/client.types';

const client: Client = fetchClient();

export default client;
