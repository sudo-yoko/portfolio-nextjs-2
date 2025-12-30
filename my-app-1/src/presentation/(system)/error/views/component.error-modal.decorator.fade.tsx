//
// エラーUI（モーダル）にふわっと表示／非表示を追加
//
'use client';

import { Fade } from '@/presentation/(system)/components/fade';
import { ErrorModalCore } from '@/presentation/(system)/error/views/component.error-modal.core';
import { useState } from 'react';

export function ErrorModalFade({
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
        <Fade open={open} onExit={() => onAction()}>
            <ErrorModalCore
                actionLabel={actionLabel}
                primaryMessage={primaryMessage}
                secondaryMessage={secondaryMessage}
                onAction={() => setOpen(false)}
            />
        </Fade>
    );
}
