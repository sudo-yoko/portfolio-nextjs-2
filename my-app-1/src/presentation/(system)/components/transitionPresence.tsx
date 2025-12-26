//
// アニメーション付き開閉を提供するコンポーネント
//
'use client';

import React, { useEffect, useState } from 'react';

export function TransitionPresence({
    children,
    open,
    onClose,
}: {
    children: React.ReactNode;
    open: boolean;
    onClose: () => void;
}) {
    const [visible, setVisible] = useState(!open);

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
        onClose();
    }

    return (
        <div>
            <div>
                <div
                    className={`${visible ? 'opacity-100' : 'opacity-10'} transition-opacity duration-1000`}
                    onTransitionEnd={handleTransitionEnd}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}
