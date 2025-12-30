//
// トースト通知 エラー
//
'use client';

import { ToastCore } from '@/presentation/(system)/components/toast.core';

export function ToastError({ message, onClose }: { message: string[]; onClose: () => void }) {
    return <ToastCore message={message} bgColor="bg-red-500" textColor="text-white" onClose={onClose} />;
}
