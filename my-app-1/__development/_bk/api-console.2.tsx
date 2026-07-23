'use client';

import ListPanel from '@/presentation/admin-console/api-console/views/api-console.list';
import ResultPanel from '@/presentation/admin-console/api-console/views/api-console.result';
import InputPanel from '@/presentation/admin-console/api-console/views/api-console.input';

export default function Console() {
    return (
        <div className="animate-in fade-in flex w-full justify-center duration-700">
            <div className="w-full max-w-6xl">
                <div className="flex flex-col gap-8">
                    {/* Header Area */}
                    <header className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-extrabold tracking-tight text-white">API Console</h1>
                            <p className="mt-1 text-sm text-indigo-200/60">システム実行とレスポンスの監視</p>
                        </div>
                        <div className="flex gap-3">
                            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white">
                                Server: Online
                            </div>
                        </div>
                    </header>

                    {/* Main Console Layout */}
                    <div className="flex flex-row items-stretch gap-6">
                        {/* Left: API List (Glass Effect) */}
                        <div className="min-h-[650px] w-1/3">
                            <ListPanel className="h-full rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 text-white shadow-2xl backdrop-blur-xl" />
                        </div>

                        {/* Right: Interaction Area */}
                        <div className="flex w-2/3 flex-col gap-6">
                            {/* Target API Panel */}
                            <div className="group flex-1 overflow-hidden">
                                <InputPanel className="h-full rounded-[2rem] bg-white/95 p-8 shadow-2xl backdrop-blur-md transition-all duration-300 group-hover:bg-white" />
                            </div>

                            {/* API Result Panel */}
                            <div className="group flex-1 overflow-hidden">
                                <ResultPanel className="h-full rounded-[2rem] border border-white/5 bg-slate-900/90 p-8 text-indigo-100 shadow-2xl backdrop-blur-md" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
