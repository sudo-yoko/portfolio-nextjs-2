//
// トースト通知 情報
//
'use client';

import { ToastFade } from '@/presentation/(system)/components/toast.core.decorator.fade';

export function ToastInfo({ message, onClose }: { message: string[]; onClose: () => void }) {
    return <ToastFade message={message} bgColor="bg-blue-500" textColor="text-white" onClose={onClose} />;
}
