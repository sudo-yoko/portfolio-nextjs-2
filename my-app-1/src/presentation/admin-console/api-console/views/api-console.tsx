'use client';

import { Fade } from '@/presentation/(system)/components/fade';
import { AdminConsoleHeader } from '@/presentation/admin-console/(shared)/views/admin-console.header';
import { useApiConsole } from '@/presentation/admin-console/api-console/view-models/api-console.reducer.hooks';
import ApiList from '@/presentation/admin-console/api-console/views/api-console.list';
import ApiResult from '@/presentation/admin-console/api-console/views/api-console.result';
import TargetApi from '@/presentation/admin-console/api-console/views/api-console.target';

/**
 * APIコンソール
 */
export default function Console() {
    const { state, dispatch } = useApiConsole();

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
                        <div className="flex flex-row gap-5">
                            <div className="w-1/3">
                                <ApiList
                                    state={state}
                                    dispatch={dispatch}
                                    className="h-full rounded-3xl border border-white/10 bg-white/5 p-5 text-white"
                                />
                            </div>
                            <div className="flex w-2/3 flex-col gap-5">
                                <div className="flex-1">
                                    <TargetApi
                                        state={state}
                                        className="h-full rounded-3xl bg-slate-950 p-5"
                                    />
                                </div>
                                <div className="flex-1">
                                    <ApiResult className="h-full rounded-3xl bg-slate-900 p-5 text-indigo-100" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fade>
    );
}
