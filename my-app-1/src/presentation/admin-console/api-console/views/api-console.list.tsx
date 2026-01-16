'use client';

import { apiList } from '@/presentation/admin-console/api-console/models/api-console.data';
import { Action, State } from '@/presentation/admin-console/api-console/view-models/api-console.reducer';
import { handleItemSelect } from '@/presentation/admin-console/api-console/view-models/api-console.reducer.hooks';
import { Item } from '../models/api-console.types';

/**
 * API選択パネル
 */
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
                    <h2 className="text-sm font-bold tracking-widest text-indigo-300/40 uppercase">
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

function ApiListButton({ onClick, item, state }: { onClick: () => void; item: Item; state: State }) {
    return (
        <button
            onClick={onClick}
            className={`flex w-full cursor-pointer items-center gap-4 rounded-2xl border p-3 transition-all duration-300 active:scale-95 ${
                item.id === state.selectedItem?.id
                    ? 'border-amber-400/50 bg-amber-400/10 shadow-lg shadow-amber-400/10'
                    : 'border-transparent bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
            } `}
        >
            {/* メソッド別のバッジ */}
            <MethodBadgeM method={item.method} />

            {/* テキスト情報 */}
            <div className="flex flex-col items-start overflow-hidden text-left">
                <span
                    className={`truncate font-mono text-sm ${item.id === state.selectedItem?.id ? 'text-amber-400' : ''}`}
                >
                    {item.description}
                </span>
                <span className="truncate text-[10px] opacity-40">{item.path}</span>
            </div>

            {/* 選択時のみ表示されるインジケーター（右端のポッチ） */}
            <div
                className={`${item.id === state.selectedItem?.id ? '' : 'invisible'} ml-auto h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400`}
            />
        </button>
    );
}

function MethodBadgeM({ method }: { method: string }) {
    return (
        <span
            className={`w-14 rounded-lg py-1 text-center text-[10px] font-black ${
                method === 'GET'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : method === 'POST'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-rose-500/20 text-rose-400'
            } `}
        >
            {method}
        </span>
    );
}
