import 'server-only';

import { envString } from '@my/env/server';
import { redirectPage } from '@my/navigation/server';

export async function handleRequest() {
    const url = envString('SYSTEM_ERROR_DEFAULT');
    // const url = envString('AUTH_ERROR_DEFAULT');
    redirectPage(url);
}
