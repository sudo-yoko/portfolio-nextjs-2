//
// エラーUI（モーダル）にふわっと表示／非表示を追加
//
'use client';

import { OpacityTransition } from '@/presentation/(system)/components/opacityTransition';
import { ErrorModalCore } from '@/presentation/(system)/error/views/component.error-modal.core';
import { useState } from 'react';

export function ErrorModalSimple({
    onAction,
    actionLabel,
    primaryMessage,
    secondaryMessage,
}: {
    onAction: () => void;
    actionLabel: string;
    primaryMessage?: string[];
    secondaryMessage?: string[];
}) {
    const [open, setOpen] = useState(true);
    return (
        <OpacityTransition open={open} onExit={() => onAction()}>
            <ErrorModalCore
                actionLabel={actionLabel}
                primaryMessage={primaryMessage}
                secondaryMessage={secondaryMessage}
                onAction={() => setOpen(false)}
            />
        </OpacityTransition>
    );
}
