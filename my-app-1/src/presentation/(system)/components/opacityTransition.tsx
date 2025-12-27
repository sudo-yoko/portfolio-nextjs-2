//
// アニメーション付き開閉を提供するコンポーネント
//
'use client';

import React, { useEffect, useState } from 'react';

export function OpacityTransition({
    children,
    open,
    onExit,
}: {
    children: React.ReactNode;
    open: boolean;
    onExit: () => void;
}) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const id = requestAnimationFrame(() => setVisible(open));
        return () => cancelAnimationFrame(id);
    }, [open]);

    function handleTransitionEnd(e: React.TransitionEvent) {
        if (visible) {
            return;
        }
        if (e.propertyName !== 'opacity') {
            return;
        }
        onExit();
    }

    return (
        <div
            className={`${visible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
            onTransitionEnd={handleTransitionEnd}
        >
            {children}
        </div>
    );
}
