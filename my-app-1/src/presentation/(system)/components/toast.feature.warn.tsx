//
// トースト通知 警告
//
'use client';

import { ToastFade } from '@/presentation/(system)/components/toast.core.decorator.fade';

export function ToastWarn({ message, onDismiss }: { message: string[]; onDismiss: () => void }) {
    return (
        <ToastFade message={message} bgColor="bg-yellow-500" textColor="text-black" onDismiss={onDismiss} />
    );
}
