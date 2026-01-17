'use client';

import { ErrorModalFade } from '@/presentation/_system/error/views/component.error-modal.decorator.fade';

export function ErrorModal({ onAction }: { onAction: () => void }) {
    const secondaryMessage: string[] = ['このウィンドウを閉じて、もう一度操作してください。'];
    const actionLabel: string = '閉じる';
    return (
        <ErrorModalFade actionLabel={actionLabel} secondaryMessage={secondaryMessage} onAction={onAction} />
    );
}
