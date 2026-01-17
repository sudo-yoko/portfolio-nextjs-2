'use client';

import React from 'react';

export function AdminConsoleButton({ active, children }: { active: boolean; children: React.ReactNode }) {
    if (active) {
        return (
            <button className="cursor-pointer rounded-full border border-amber-400 bg-amber-400/10 px-4 py-2 text-xs font-bold text-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)] transition-all duration-200 active:scale-95">
                {children}
            </button>
        );
    }
    return (
        <button className="cursor-pointer rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white transition-all duration-200 active:scale-95">
            {children}
        </button>
    );
}
