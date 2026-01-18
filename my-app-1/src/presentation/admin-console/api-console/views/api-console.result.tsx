'use client';

import { BoltIcon } from '@heroicons/react/24/outline';

export default function ResultPanel() {
    return (
        <div className="flex flex-col rounded-3xl bg-slate-900/80 p-5 text-indigo-100">
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
                    <p className="text-xs text-slate-600">リクエストを実行するとここに結果が表示されます</p>
                </div>
            </div>
        </div>
    );
}
