'use client';

import { usePathname } from 'next/navigation';

import { AdminConsoleButton } from '@/presentation/admin-console/(shared)/views/admin-console.buttons';

export function AdminConsoleHeader() {
    const pathname = usePathname();
    return (
        <header className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-extrabold text-white">Admin Console</h1>
                <p className="mt-1 text-sm text-indigo-200/60">運用管理コンソール</p>
            </div>
            <div className="flex flex-row gap-3">
                <AdminConsoleButton active={pathname === '/admin-console/job-dashboard'}>
                    ジョブ・ダッシュボード
                </AdminConsoleButton>
                <AdminConsoleButton active={pathname === '/admin-console/api-console'}>
                    API コンソール
                </AdminConsoleButton>
            </div>
        </header>
    );
}
