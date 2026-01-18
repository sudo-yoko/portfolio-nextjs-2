'use client';

import { BoltIcon } from '@heroicons/react/24/outline';

export default function ResultPanel() {
    return (
        <div
            className={`flex flex-col rounded-3xl border border-white/5 bg-slate-900/80 p-6 text-indigo-100 shadow-2xl backdrop-blur-md`}
        >
            {/* ヘッダー部分は共通の骨組みを維持（レイアウトがガタつかないため） */}
            <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center gap-2">
                    <h2 className="text-sm font-bold tracking-widest text-indigo-300/40 uppercase">
                        Response Output
                    </h2>
                </div>
            </div>

            {/* メインコンテンツエリア */}
            <div className="flex flex-1 flex-col items-center justify-center space-y-4">
                {/* 中央のグラフィカルなインジケーター */}
                <div className="relative flex items-center justify-center">
                    {/* 背景の光輪（ぼんやりしたアクセント） */}
                    <div className="absolute h-24 w-24 rounded-full bg-indigo-500/5 blur-2xl" />

                    {/* アイコン：Zap（稲妻）などで「実行待ち」を表現 
                    <div className="relative rounded-2xl border border-white/5 bg-white/5 p-4 text-indigo-300/20"></div>
                    CodeBracketIcon
                    */}
                    <BoltIcon className="h-12 w-12 animate-[pulse_3s_ease-in-out_infinite] text-indigo-300" />
                </div>

                {/* ガイドメッセージ */}
                <div className="space-y-1 text-center">
                    <p className="text-sm font-medium text-indigo-300/30">No output detected</p>
                    <p className="text-[11px] text-slate-600">
                        リクエストを実行するとここに結果が表示されます
                    </p>
                </div>
            </div>

            {/* フッターのプレースホルダー */}
            <div className="mt-3 flex justify-end opacity-0">
                <span className="font-mono text-[10px]">READY</span>
            </div>
        </div>
    );
}
