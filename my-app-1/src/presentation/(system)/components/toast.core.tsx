//
// トースト通知
//
'use client';

import { XCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';

export function ToastCore({
    children,
    message,
    bgColor,
    textColor,
    onClose,
}: {
    children: (innerElem: React.ReactNode) => React.ReactNode;
    message: string[];
    bgColor: string;
    textColor: string;
    onClose: () => void;
}) {
    return (
        <div className="fixed">
            {/* NOTE: レンダープロップス方式で外部から渡されたデコレーター要素を挟み込む */}
            {children(
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
                            onClick={onClose}
                            className="h-7 w-7 cursor-pointer transition-all active:scale-95"
                        />
                    </div>
                </div>,
            )}
        </div>
    );
}
