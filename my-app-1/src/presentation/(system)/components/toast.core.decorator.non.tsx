//
// トースト通知 デコレーター：装飾なし
//
'use client';

import { ToastCore } from '@/presentation/(system)/components/toast.core';

export function Toast({
    message,
    bgColor,
    textColor,
    onClose,
}: {
    message: string[];
    bgColor: string;
    textColor: string;
    onClose: () => void;
}) {
    return (
        <ToastCore message={message} bgColor={bgColor} textColor={textColor} onClose={onClose}>
            {/* NOTE: デコレーターなし */}
            {(innerElem) => innerElem}
        </ToastCore>
    );
}
