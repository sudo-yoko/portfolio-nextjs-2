//
// エラーUI（モーダル）
//
'use client';

import { Button } from '@/presentation/(system)/components/button.decorator.simple';

export function ErrorModalCore({
    onAction,
    actionLabel,
    primaryMessage,
    secondaryMessage,
}: {
    onAction: () => void;
    actionLabel: string;
    primaryMessage?: string[];
    secondaryMessage?: string[];
}) {
    const primaryMessageDefault = ['システムエラーが発生しました。'];

    const message: string[] = [];
    if (primaryMessage) {
        message.push(...primaryMessage);
    } else {
        message.push(...primaryMessageDefault);
    }
    if (secondaryMessage) {
        message.push(...secondaryMessage);
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* 背面オーバーレイ */}
            <div className="absolute inset-0 bg-black/50 transition-opacity" />
            {/* モーダル本体 */}
            <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                {message.map((m, index) => (
                    <div key={index}>{m}</div>
                ))}
                <Button onClick={onAction}>{actionLabel}</Button>
            </div>
        </div>
    );
}
