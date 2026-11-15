import 'server-only';

import { redirect } from 'next/navigation';

import { isAuthError } from '@my/error';

// リダイレクトするため、戻らない関数(never)
export function navigationError(e: unknown): never {
    if (isAuthError(e)) {
        redirect('/auth-error');
    }
    redirect('system-error');
}
