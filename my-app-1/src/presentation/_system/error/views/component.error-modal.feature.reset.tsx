'use client';

import { ErrorModalFade } from '@/presentation/_system/error/views/component.error-modal.decorator.fade';

export function ErrorModal({ onAction }: { onAction: () => void }) {
    const primaryMessage: string[] = ['システムエラーです。', 'ご迷惑をおかけしております。'];
    const secondaryMessage: string[] = ['最初から操作をやり直してください。'];
    const actionLabel: string = 'OK';
    return (
        <ErrorModalFade
            actionLabel={actionLabel}
            primaryMessage={primaryMessage}
            secondaryMessage={secondaryMessage}
            onAction={onAction}
        />
    );
}
