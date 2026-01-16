'use client';

import { Fade } from '@/presentation/(system)/components/fade';
import { Action, State } from '../view-models/api-console.reducer';
import { handleItemClear } from '../view-models/api-console.reducer.hooks';
import { JSX } from 'react';

/**
 * API実行パネル
 */
export default function InputPanel({
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
            <div className="flex h-full flex-col">
                {/* ヘッダー部分 */}
                <div className="flex items-center pb-4">
                    <h2 className="text-sm font-bold tracking-widest text-indigo-300 uppercase">
                        Target API Configuration
                    </h2>
                </div>

                {!state.selectedItem ? (
                    <div className="flex h-full flex-col items-center justify-center gap-3 opacity-40">
                        <div className="h-12 w-12 rounded-full border-2 border-dashed border-slate-500" />
                        <p className="text-sm text-slate-200 italic">APIを選択してください</p>
                    </div>
                ) : (
                    <Fade
                        open={true}
                        onExit={() => {
                            return;
                        }}
                    >
                        <div className="flex h-full flex-col gap-6">
                            {/* API基本情報 */}
                            <div className="space-y-1">
                                <h3 className="text-lg font-bold text-white">
                                    {state.selectedItem.description}
                                </h3>
                                <div className="flex items-center gap-2 font-mono text-sm">
                                    <MethodBadgeS method={state.selectedItem.method} />
                                    <span className="text-indigo-300/80">{state.selectedItem.path}</span>
                                </div>
                            </div>

                            {/* パラメーター入力フォーム */}
                            <InputForm inputFormFactory={state.selectedItem.inputFormFactory} />

                            {/* アクションボタン */}
                            <div className="flex gap-3 border-t border-white/5 pt-4">
                                <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-3 text-sm font-bold text-slate-950 shadow-[0_0_20px_rgba(251,191,36,0.2)] transition-all hover:bg-amber-300 active:scale-95">
                                    RUN REQUEST
                                </button>
                                <button
                                    onClick={() => handleItemClear(dispatch)}
                                    className="flex items-center justify-center gap-2 rounded-xl bg-white/5 px-4 py-3 text-sm font-bold text-slate-400 transition-all hover:bg-white/10 hover:text-rose-400"
                                >
                                    CLEAR
                                </button>
                            </div>
                        </div>
                    </Fade>
                )}
            </div>
        </div>
    );
}

function MethodBadgeS({ method }: { method: string }) {
    return (
        <span
            className={`rounded px-2 py-0.5 text-[10px] font-black ${
                method === 'GET'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : method === 'POST'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-rose-500/20 text-rose-400'
            }`}
        >
            {method}
        </span>
    );
}

function InputForm({ inputFormFactory }: { inputFormFactory: () => JSX.Element }) {
    return inputFormFactory();
}
