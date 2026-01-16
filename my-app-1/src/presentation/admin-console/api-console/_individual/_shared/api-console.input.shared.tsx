//
// API実行パネル 共通コンポーネント
//
'use client';

export function SectionField({ field }: { field: string }) {
    return (
        <div className="space-y-1.5">
            <label className="ml-1 text-xs tracking-widest text-indigo-200/60">{field}</label>
            <input
                type="text"
                placeholder={`Enter ${field}...`}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white transition-all outline-none placeholder:text-slate-600 focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20"
            />
        </div>
    );
}

/**
 * セクションラベル：PATH PARAMETER
 */
export function SectionLabelPathParameter() {
    return <SectionLabel label="Path Parameter" />;
}

/**
 * セクションラベル：QUERY PARAMETER
 */
export function SectionLabelQueryParameter() {
    return <SectionLabel label="Query Parameter" />;
}

/**
 * セクションラベル：BODY DATA
 */
export function SectionLabelBodyData() {
    return <SectionLabel label="Body Data" />;
}

function SectionLabel({ label }: { label: string }) {
    return (
        <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-white/40" />
            <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">{label}</span>
        </div>
    );
}
