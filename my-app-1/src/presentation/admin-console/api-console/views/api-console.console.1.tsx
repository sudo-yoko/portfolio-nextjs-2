'use client';

import ApiList from '@/presentation/admin-console/api-console/views/api-console.list';
import ApiResult from '@/presentation/admin-console/api-console/views/api-console.result';
import TargetApi from '@/presentation/admin-console/api-console/views/api-console.target';

export default function Console() {
    return (
        <div className="flex justify-center">
            <div className="w-full max-w-4xl">
                <div className="flex flex-col gap-5">
                    <div className="text-white">API コンソール</div>
                    <div className="flex flex-row items-stretch gap-5">
                        <div className="w-1/3">
                            <ApiList className="h-full rounded-3xl bg-white p-5" />
                        </div>
                        <div className="flex w-2/3 flex-col gap-5">
                            <div className="flex-1">
                                <TargetApi className="h-full rounded-3xl bg-white p-5" />
                            </div>
                            <div className="flex-1">
                                <ApiResult className="h-full rounded-3xl bg-white p-5" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
