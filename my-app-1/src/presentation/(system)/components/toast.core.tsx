//
// トースト通知
// （開閉アニメーションを共通コンポーネント化）
//
'use client';

import { OpacityTransition } from '@/presentation/(system)/components/opacityTransition';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export function ToastCore({
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
        <div className="fixed">
            <OpacityTransition open={open} onExit={onClose}>
                <div
                    className={`flex cursor-context-menu items-start gap-0 rounded ${bgColor} px-4 py-2 ${textColor} shadow-lg transition-all hover:brightness-95`}
                >
                    <div>
                        {message.map((msg, index) => (
                            <div key={index}>{msg}</div>
                        ))}
                    </div>
                    <div>
                        <XCircleIcon
                            title="閉じる"
                            onClick={handleClose}
                            className="h-7 w-7 cursor-pointer transition-all active:scale-95"
                        />
                    </div>
                </div>
            </OpacityTransition>
        </div>
    );
}
