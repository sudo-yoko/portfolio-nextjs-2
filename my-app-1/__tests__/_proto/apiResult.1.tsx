import { Terminal, Copy, Trash2 } from 'lucide-react'; // アイコンライブラリ

export default function ApiResult({ className }: { className?: string }) {
  // 実際にはここが state などで動的に変わるイメージです
  const status = 200;
  const responseTime = "142ms";

  return (
    <div className={`flex flex-col rounded-3xl bg-slate-900/80 border border-white/5 p-6 text-indigo-100 shadow-2xl backdrop-blur-md ${className}`}>
      
      {/* ヘッダー：ステータスや実行時間の表示 */}
      <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <Terminal size={16} className="text-amber-400" />
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-300/70">Response Output</span>
        </div>
        
        {/* レスポンス情報バッジ */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-slate-500">{responseTime}</span>
          <span className={`rounded-full px-3 py-0.5 text-[10px] font-bold ${
            status === 200 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
          }`}>
            STATUS: {status}
          </span>
        </div>
      </div>

      {/* コンテンツエリア：コードビューアー風 */}
      <div className="relative flex-1 group">
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400" title="Copy JSON"><Copy size={14} /></button>
          <button className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400" title="Clear"><Trash2 size={14} /></button>
        </div>

        <pre className="h-full w-full overflow-auto rounded-xl bg-black/40 p-4 font-mono text-xs leading-relaxed custom-scrollbar">
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
        <span className="text-[10px] text-slate-600 font-mono tracking-tighter">
          UTF-8 | JSON | 248 bytes
        </span>
      </div>
    </div>
  );
}