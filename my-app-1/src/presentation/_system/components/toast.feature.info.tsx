//
// トースト通知 情報
//
'use client';

import { ToastFade } from '@/presentation/_system/components/toast.core.decorator.fade';

export function ToastInfo({ message, onDismiss }: { message: string[]; onDismiss: () => void }) {
    return <ToastFade message={message} bgColor="bg-blue-500" textColor="text-white" onDismiss={onDismiss} />;
}
