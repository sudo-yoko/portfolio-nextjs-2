import 'server-only';

import { redirect } from 'next/navigation';

// リダイレクトするため、戻らない関数(never)
export function redirectPage(url: string): never {
    redirect(url);
}
