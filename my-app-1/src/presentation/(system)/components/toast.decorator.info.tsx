//
// トースト通知 情報
//
'use client';

import { ToastCore } from '@/presentation/(system)/components/toast.core';

export function ToastInfo({ message, onClose }: { message: string[]; onClose: () => void }) {
    return <ToastCore message={message} bgColor="bg-blue-500" textColor="text-white" onClose={onClose} />;
}
