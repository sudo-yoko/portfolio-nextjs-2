//
// アニメーション付き開閉を提供するコンポーネント
//
'use client';

import React, { useEffect, useState } from 'react';

export function OpacityTransition({
    children,
    open,
    onClose,
}: {
    children: React.ReactNode;
    open: boolean;
    onClose: () => void;
}) {
    const [appear, setAppear] = useState(() => (open ? false : true));

    useEffect(() => {
        const id = requestAnimationFrame(() => setAppear(open));
        return () => cancelAnimationFrame(id);
    }, [open]);

    function handleTransitionEnd(e: React.TransitionEvent) {
        if (appear) {
            return;
        }
        if (e.propertyName !== 'opacity') {
            return;
        }
        onClose();
    }

    return (
        <div
            className={`${appear ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
            onTransitionEnd={handleTransitionEnd}
        >
            {children}
        </div>
    );
}
