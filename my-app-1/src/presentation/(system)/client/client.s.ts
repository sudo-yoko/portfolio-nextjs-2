import 'server-only';

import { clientImpl } from '@/presentation/(system)/client/client.impl.axios';
import { Client } from '@/presentation/(system)/client/client.types';

const client: Client = clientImpl;

export default client;
