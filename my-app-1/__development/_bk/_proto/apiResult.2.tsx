import { Database, Zap } from 'lucide-react';

export default function ApiResult({ className, hasResult = false }: { className?: string, hasResult?: boolean }) {
  return (
    <div className={`flex flex-col rounded-3xl bg-slate-900/80 border border-white/5 p-6 text-indigo-100 shadow-2xl backdrop-blur-md ${className}`}>
      
      {/* ヘッダー部分は共通の骨組みを維持（レイアウトがガタつかないため） */}
      <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <Database size={16} className="text-indigo-400/50" />
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-300/40">Response Output</span>
        </div>
      </div>

      {/* メインコンテンツエリア */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-4">
        {/* 中央のグラフィカルなインジケーター */}
        <div className="relative flex items-center justify-center">
          {/* 背景の光輪（ぼんやりしたアクセント） */}
          <div className="absolute h-24 w-24 rounded-full bg-indigo-500/5 blur-2xl" />
          
          {/* アイコン：Zap（稲妻）などで「実行待ち」を表現 */}
          <div className="relative rounded-2xl border border-white/5 bg-white/5 p-4 text-indigo-300/20">
            <Zap size={32} />
          </div>
        </div>

        {/* ガイドメッセージ */}
        <div className="text-center space-y-1">
          <p className="text-sm font-medium text-indigo-300/30">No output detected</p>
          <p className="text-[11px] text-slate-600">
            リクエストを実行するとここに結果が表示されます
          </p>
        </div>
      </div>

      {/* フッターのプレースホルダー */}
      <div className="mt-3 flex justify-end opacity-0">
        <span className="text-[10px] font-mono">READY</span>
      </div>
    </div>
  );
}