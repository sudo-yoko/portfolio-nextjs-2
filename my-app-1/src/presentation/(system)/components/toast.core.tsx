//
// トースト通知
//
'use client';

import { OpacityTransition } from '@/presentation/(system)/components/opacityTransition';
import { useState } from 'react';

export type Props = {
    message: string[];
    bgColor: string;
    textColor: string;
    onClose: () => void;
};

export function ToastCore(props: Props) {
    const [open, setOpen] = useState(true);

    // トーストを閉じる
    function handleClose() {
        if (open) setOpen(false);
    }

    return (
        <div title="閉じる" className="fixed cursor-pointer" onClick={handleClose}>
            <OpacityTransition open={open} onClose={props.onClose}>
                <div
                    className={`rounded ${props.bgColor} px-4 py-2 ${props.textColor} shadow-lg transition-all hover:brightness-95 active:scale-95`}
                >
                    {props.message.map((msg, index) => (
                        <div key={index}>{msg}</div>
                    ))}
                </div>
            </OpacityTransition>
        </div>
    );
}
