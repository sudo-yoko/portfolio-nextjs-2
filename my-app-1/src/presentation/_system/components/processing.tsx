'use client';

import React from 'react';

export function Processing({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div className="inset-0 z-50 flex flex-col items-center justify-center bg-white/50">
                <div className="size-16 animate-spin rounded-full border-t-4 border-solid border-t-gray-300"></div>
                <p className="mt-4 animate-pulse text-lg text-gray-700">{children}</p>
            </div>
        </div>
    );
}
