//
// API実行パネル 共通コンポーネント
//
'use client';

import { Action as ParentAction } from '@/presentation/admin-console/api-console/view-models/api-console.reducer';
import { handleItemClear } from '@/presentation/admin-console/api-console/view-models/api-console.reducer.hooks';
import React from 'react';

export function SectionField({
    field,
    value,
    onChange,
}: {
    field: string;
    value: string;
    onChange: (value: string) => void;
}) {
    return (
        <div className="space-y-1.5">
            <label className="ml-1 text-xs tracking-widest text-indigo-200/60">{field}</label>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
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

/**
 * セクションラベル：REQUEST HEADER
 */
export function SectionLabelRequestHeader() {
    return <SectionLabel label="Request Header" />;
}

function SectionLabel({ label }: { label: string }) {
    return (
        <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-white/40" />
            <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">{label}</span>
        </div>
    );
}

/**
 * アクションボタン
 */
export function ActionButton({
    onRun,
    parentDispatch,
}: {
    onRun: () => void;
    parentDispatch: React.Dispatch<ParentAction>;
}) {
    return (
        <div className="flex gap-3 border-t border-white/40 pt-4">
            <button
                onClick={onRun}
                className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-3 text-sm font-bold text-slate-950 transition-all hover:bg-amber-300 active:scale-95"
            >
                RUN REQUEST
            </button>
            <button
                onClick={() => handleItemClear(parentDispatch)}
                className="flex cursor-pointer items-center justify-center rounded-xl bg-white/5 px-4 py-3 text-sm font-bold text-slate-400 transition-all hover:bg-white/10 hover:text-rose-400 active:scale-95"
            >
                CLEAR
            </button>
        </div>
    );
}
