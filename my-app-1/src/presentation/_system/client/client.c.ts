//
// クライアントサイド専用 Client
//
import 'client-only';

import { clientImpl } from '@/presentation/_system/client/client.impl.fetch';
import { Client } from '@/presentation/_system/client/client.types';

const client: Client = clientImpl;

export default client;
