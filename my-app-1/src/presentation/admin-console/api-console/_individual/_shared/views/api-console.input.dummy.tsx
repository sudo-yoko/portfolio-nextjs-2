'use client';

import {
    Action as ParentAction,
    State as ParentState,
} from '@/presentation/admin-console/api-console/view-models/api-console.reducer';
import { RocketLaunchIcon } from '@heroicons/react/24/outline';

export function DummyIndividualForm({
    parentState,
    parentDispatch,
}: {
    parentState: ParentState;
    parentDispatch: React.Dispatch<ParentAction>;
}) {
    return (
        <div className="flex h-full flex-col items-center justify-center gap-3 opacity-40">
            <RocketLaunchIcon className="size-10 text-indigo-300/50" />
            <p className="text-sm text-slate-400">準備中・・・</p>
        </div>
    );
}
