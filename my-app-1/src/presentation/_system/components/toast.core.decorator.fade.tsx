//
// トースト通知 デコレーター：ふわっと表示／非表示を追加
//
'use client';

import { Fade } from '@/presentation/_system/components/fade';
import { ToastCore } from '@/presentation/_system/components/toast.core';
import { useState } from 'react';

export function ToastFade({
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
    const [open, setOpen] = useState(true);

    // トーストを閉じる
    function handleDismiss() {
        if (open) setOpen(false);
    }

    return (
        <ToastCore message={message} bgColor={bgColor} textColor={textColor} onDismiss={handleDismiss}>
            {/* NOTE: レンダープロップス方式で、Toastコンポーネントの中にFade要素を挟み込む */}
            {(innerElem) => (
                <Fade open={open} onExit={onDismiss}>
                    {innerElem}
                </Fade>
            )}
        </ToastCore>
    );
}
