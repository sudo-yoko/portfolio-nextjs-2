//
// トースト通知 エラー
//
'use client';

import { ToastFade } from '@/presentation/(system)/components/toast.core.decorator.fade';

export function ToastError({ message, onClose }: { message: string[]; onClose: () => void }) {
    return <ToastFade message={message} bgColor="bg-red-500" textColor="text-white" onClose={onClose} />;
}
