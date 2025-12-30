'use client';

import { ErrorModalSimple } from '@/presentation/(system)/error/views/component.error-modal.decorator.fade';

export function ErrorModal({ onAction }: { onAction: () => void }) {
    const actionLabel: string = 'OK';
    const primaryMessage: string[] = ['システムエラーです。', 'ご迷惑をおかけしております。'];
    const secondaryMessage: string[] = ['最初から操作をやり直してください。'];
    return (
        <ErrorModalSimple
            actionLabel={actionLabel}
            primaryMessage={primaryMessage}
            secondaryMessage={secondaryMessage}
            onAction={onAction}
        />
    );
}
