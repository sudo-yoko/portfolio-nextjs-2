'use client';

import { BoltIcon } from '@heroicons/react/24/outline';
import { Action, State } from '../view-models/api-console.reducer';
import React from 'react';

export default function ResultPanel({ state, dispatch }: { state: State; dispatch: React.Dispatch<Action> }) {
    const status = 200;
    const responseTime = '142ms';

    return (
        <div className="flex flex-col rounded-3xl bg-slate-900/80 p-5 text-indigo-100">
            {state.apiResult ? (
                <div>
                    <div className="mb-4 flex items-center border-b border-white/5 pb-3">
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
                    <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-3">
                        <div className="flex items-center gap-2">
                            {/*
                              <Terminal size={16} className="text-amber-400" />
                              */}
                            <span className="text-xs font-bold tracking-widest text-indigo-300/70 uppercase">
                                Response Output
                            </span>
                        </div>

                        {/* レスポンス情報バッジ */}
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-[10px] text-slate-500">{responseTime}</span>
                            <span
                                className={`rounded-full px-3 py-0.5 text-[10px] font-bold ${
                                    status === 200
                                        ? 'bg-emerald-500/20 text-emerald-400'
                                        : 'bg-rose-500/20 text-rose-400'
                                }`}
                            >
                                STATUS: {status}
                            </span>
                        </div>
                    </div>

                    {/* コンテンツエリア：コードビューアー風 */}
                    <div className="group relative flex-1">
                        <div className="absolute top-2 right-2 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                            {/** 
                              <button className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400" title="Copy JSON"><Copy size={14} /></button>
                              <button className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400" title="Clear"><Trash2 size={14} /></button>
                              */}
                        </div>

                        <pre className="custom-scrollbar h-full w-full overflow-auto rounded-xl bg-black/40 p-4 font-mono text-xs leading-relaxed">
                            <code className="text-indigo-200">
                                {`{
    "status": "success",
    "data": {
        "id": "cust_9921",
        "name": "Gemini Customer",
        "email": "gemini@example.com",
        "roles": ["admin", "user"],
        "last_login": "2024-03-21T10:22:01Z"
    }
}`}
                            </code>
                        </pre>
                    </div>

                    {/* フッター（オプション）：ページネーションや件数など */}
                    <div className="mt-3 flex justify-end">
                        <span className="font-mono text-[10px] tracking-tighter text-slate-600">
                            UTF-8 | JSON | 248 bytes
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
