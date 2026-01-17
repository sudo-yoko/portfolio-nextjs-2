//
// トースト通知 デコレーター：装飾なし
//
'use client';

import { ToastCore } from '@/presentation/_system/components/toast.core';

export function Toast({
    message,
    bgColor,
    textColor,
    onDismiss,
}: {
    message: string[];
    bgColor: string;
    textColor: string;
    onDismiss: () => void;
}) {
    return (
        <ToastCore message={message} bgColor={bgColor} textColor={textColor} onDismiss={onDismiss}>
            {/* デコレーターなし */}
            {(innerElem) => innerElem}
        </ToastCore>
    );
}
