//
// トースト通知 エラー
//
'use client';

import { ToastFade } from '@/presentation/_system/components/toast.core.decorator.fade';

export function ToastError({ message, onDismiss }: { message: string[]; onDismiss: () => void }) {
    return <ToastFade message={message} bgColor="bg-red-500" textColor="text-white" onDismiss={onDismiss} />;
}
