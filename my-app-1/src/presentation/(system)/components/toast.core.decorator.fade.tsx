//
// トースト通知 デコレーター：ふわっと表示／非表示を追加
//
'use client';

import { Fade } from '@/presentation/(system)/components/fade';
import { ToastCore } from '@/presentation/(system)/components/toast.core';
import { useState } from 'react';

export function ToastFade({
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
    const [open, setOpen] = useState(true);

    // トーストを閉じる
    function handleClose() {
        if (open) setOpen(false);
    }

    return (
        <ToastCore message={message} bgColor={bgColor} textColor={textColor} onClose={handleClose}>
            {/* NOTE: レンダープロップス方式で、Toastコンポーネントの中にFade要素を挟み込む */}
            {(innerElem) => (
                <Fade open={open} onExit={onClose}>
                    {innerElem}
                </Fade>
            )}
        </ToastCore>
    );
}
