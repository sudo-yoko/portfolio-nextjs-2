'use client';

import { Fade } from '@/presentation/(system)/components/fade';
import { AdminConsoleHeader } from '@/presentation/admin-console/(shared)/views/admin-console.header';
import ApiList from '@/presentation/admin-console/api-console/views/api-console.list';
import ApiResult from '@/presentation/admin-console/api-console/views/api-console.result';
import TargetApi from '@/presentation/admin-console/api-console/views/api-console.target';

export default function Console() {
    return (
        <Fade
            open={true}
            onExit={() => {
                return;
            }}
        >
            <div className="flex justify-center">
                <div className="w-full max-w-4xl">
                    <div className="flex flex-col gap-5">
                        <AdminConsoleHeader />
                        <div className="flex flex-row items-stretch gap-5">
                            <div className="h-96 w-1/3">
                                <ApiList className="h-full rounded-3xl border border-white/10 bg-white/5 p-5 text-white shadow-2xl backdrop-blur-xl" />
                            </div>
                            <div className="flex w-2/3 flex-col gap-5">
                                <div className="flex-1">
                                    <TargetApi className="h-full rounded-3xl bg-indigo-100 p-5 shadow-2xl" />
                                </div>
                                <div className="flex-1">
                                    <ApiResult className="h-full rounded-3xl bg-slate-900 p-5 text-indigo-100 shadow-2xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fade>
    );
}
