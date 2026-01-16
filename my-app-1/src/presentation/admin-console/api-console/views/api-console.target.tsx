'use client';

import { Fade } from '@/presentation/(system)/components/fade';
import { State } from '../view-models/api-console.reducer';
import { MethodBadgeS } from './api-console.buttons';

export default function TargetApi({ state, className }: { state: State; className: string }) {
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

                            {/* 入力エリア（スクロール可能） */}
                            <div className="custom-scrollbar flex-1 space-y-6 overflow-y-auto pr-2">
                                {/* 各パラメータセクション */}
                                {[
                                    { label: 'Path Parameter', field: 'customerId' },
                                    { label: 'Query Parameter', field: 'queryId' },
                                    { label: 'Request Body', field: 'bodyData' },
                                ].map((section) => (
                                    <div key={section.label} className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <div className="h-px flex-1 bg-white/40" />
                                            <span className="text-[10px] font-bold tracking-tighter text-slate-500 uppercase">
                                                {section.label}
                                            </span>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="ml-1 text-xs text-indigo-200/60">
                                                {section.field}
                                            </label>
                                            <input
                                                type="text"
                                                placeholder={`Enter ${section.field}...`}
                                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white transition-all outline-none placeholder:text-slate-600 focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* アクションボタン */}
                            <div className="flex gap-3 border-t border-white/5 pt-4">
                                <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-3 text-sm font-bold text-slate-950 shadow-[0_0_20px_rgba(251,191,36,0.2)] transition-all hover:bg-amber-300 active:scale-95">
                                    RUN REQUEST
                                </button>
                                <button className="flex items-center justify-center gap-2 rounded-xl bg-white/5 px-4 py-3 text-sm font-bold text-slate-400 transition-all hover:bg-white/10 hover:text-rose-400">
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

function InputPanel({ state }: { state: State }) {
    return state.selectedItem?.inputPanel?.(state) || null;
}

export function customersApiPanel({ state }: { state: State }) {
    return <div>customerId</div>;
}
