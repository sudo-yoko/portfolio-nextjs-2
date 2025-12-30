'use client';

import { ErrorModalSimple } from '@/presentation/(system)/error/views/component.error-modal.decorator.fade';

export function ErrorModal({ onAction }: { onAction: () => void }) {
    const actionLabel: string = '閉じる';
    const secondaryMessage: string[] = ['このウィンドウを閉じて、もう一度操作してください。'];
    return (
        <ErrorModalSimple actionLabel={actionLabel} secondaryMessage={secondaryMessage} onAction={onAction} />
    );
}
