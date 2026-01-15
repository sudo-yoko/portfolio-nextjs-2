//
// エラーUI（モーダル）
//
'use client';

import { Button } from '@/presentation/(system)/components/button.decorator.simple';

export function ErrorModalCore({
    onAction,
    actionLabel,
    userFacingMessagePrimary,
    userFacingMessageSecondary,
}: {
    onAction: () => void;
    actionLabel: string;
    userFacingMessagePrimary?: string[];
    userFacingMessageSecondary?: string[];
}) {
    const primaryMessageDefault = ['システムエラーが発生しました。'];

    const message: string[] = [];
    // message.push(...(primaryMessage ?? primaryMessageDefault));
    if (userFacingMessagePrimary) {
        message.push(...userFacingMessagePrimary);
    } else {
        message.push(...primaryMessageDefault);
    }
    if (userFacingMessageSecondary) {
        message.push(...userFacingMessageSecondary);
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
