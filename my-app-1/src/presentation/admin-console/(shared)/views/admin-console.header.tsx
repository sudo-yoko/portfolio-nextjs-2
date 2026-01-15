'use client';

import { usePathname } from 'next/navigation';

import {
    AdminConsoleButton,
    AdminConsoleButtonGlow,
} from '@/presentation/admin-console/(shared)/views/admin-console.buttons';

export function AdminConsoleHeader() {
    const pathname = usePathname();
    return (
        <header className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-extrabold text-white">Admin Console</h1>
                <p className="mt-1 text-sm text-indigo-200/60">運用管理コントロールパネル</p>
            </div>
            <div className="flex flex-row gap-3">
                {pathname === '/admin-console/job-dashboard' ? (
                    <AdminConsoleButtonGlow>ジョブ・ダッシュボード</AdminConsoleButtonGlow>
                ) : (
                    <AdminConsoleButton>ジョブ・ダッシュボード</AdminConsoleButton>
                )}
                {pathname === '/admin-console/api-console' ? (
                    <AdminConsoleButtonGlow>API コンソール</AdminConsoleButtonGlow>
                ) : (
                    <AdminConsoleButton>API コンソール</AdminConsoleButton>
                )}
            </div>
        </header>
    );
}
