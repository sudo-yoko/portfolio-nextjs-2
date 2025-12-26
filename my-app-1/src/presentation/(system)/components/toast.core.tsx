//
// トースト通知
//
'use client';

import { TransitionPresence } from '@/presentation/(system)/components/transitionPresence';
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
        if (!open) return; // 連打防止
        setOpen(false);
    }

    return (
        <div title="閉じる" className="fixed cursor-pointer" onClick={handleClose}>
            <TransitionPresence open={open} onClose={props.onClose}>
                <div className={`rounded ${props.bgColor} px-4 py-2 ${props.textColor} shadow-lg`}>
                    {props.message.map((msg, index) => (
                        <div key={index}>{msg}</div>
                    ))}
                </div>
            </TransitionPresence>
        </div>
    );
}
