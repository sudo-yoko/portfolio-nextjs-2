'use client';

import { BoltIcon } from '@heroicons/react/24/outline';
import { State } from '../view-models/api-console.reducer';

export default function ResultPanel({ state }: { state: State }) {
    return (
        <div className="flex flex-col rounded-3xl bg-slate-900/80 p-5 text-indigo-100">
            {!state.apiResult ? (
                <div>
                    <div className="mb-4 flex items-center border-b border-white/10 pb-3">
                        <div className="flex items-center">
                            <h2 className="text-sm font-bold tracking-widest text-indigo-300/40 uppercase">
                                Response Output
                            </h2>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col items-center justify-center pb-5">
                        <div className="flex items-center justify-center">
                            <BoltIcon className="size-12 animate-pulse text-indigo-300" />
                        </div>
                        <div className="space-y-1 text-center">
                            <p className="text-sm font-medium text-indigo-300/30">No output detected</p>
                            <p className="text-xs text-slate-600">
                                リクエストを実行するとここに結果が表示されます
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    {/* ヘッダー：ステータスや実行時間の表示 */}
                    <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                        <div className="flex items-center">
                            {/*
                              <Terminal size={16} className="text-amber-400" />
                              */}
                            <span className="text-sm font-bold tracking-widest text-indigo-300/70 uppercase">
                                Response Output
                            </span>
                        </div>

                        {/* レスポンス情報バッジ */}
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-[10px] text-slate-500">
                                {state.apiResult.responseTime}ms
                            </span>
                            <span
                                className={`rounded-full px-3 py-0.5 text-[10px] font-bold ${
                                    state.apiResult.status === '200'
                                        ? 'bg-emerald-500/20 text-emerald-400'
                                        : 'bg-rose-500/20 text-rose-400'
                                }`}
                            >
                                STATUS: {state.apiResult.status}
                            </span>
                        </div>
                    </div>

                    {/* レスポンスボディの表示 */}
                    <div>
                        <pre className="h-full w-full rounded-xl bg-black/40 p-4 font-mono text-xs">
                            {state.apiResult.body && (
                                <code className="text-sm text-indigo-200">
                                    {JSON.stringify(JSON.parse(state.apiResult.body), null, 2)}
                                </code>
                            )}
                        </pre>
                    </div>
                </div>
            )}
        </div>
    );
}
