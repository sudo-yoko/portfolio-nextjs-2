'use client';

import { apiList } from '@/presentation/admin-console/api-console/models/api-console.data';
import { Action, State } from '@/presentation/admin-console/api-console/view-models/api-console.reducer';
import { handleItemSelect } from '@/presentation/admin-console/api-console/view-models/api-console.reducer.hooks';
import { ApiListButton } from '@/presentation/admin-console/api-console/views/api-console.buttons';

export default function ApiList({
    state,
    dispatch,
    className,
}: {
    state: State;
    dispatch: React.Dispatch<Action>;
    className: string;
}) {
    return (
        <div className={className}>
            <div className="flex h-full flex-col space-y-4">
                <div className="px-2">
                    <h2 className="text-xs font-bold tracking-widest text-indigo-300/40 uppercase">
                        Endpoints
                    </h2>
                </div>
                <div className="flex-1">
                    <div className="flex flex-col gap-2">
                        {apiList.map((item) => {
                            return (
                                <ApiListButton
                                    key={item.id}
                                    onClick={() => handleItemSelect(dispatch, item)}
                                    item={item}
                                    state={state}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
