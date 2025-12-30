//
// トースト通知 警告
//
'use client';

import { ToastCore } from '@/presentation/(system)/components/toast.core';

export function ToastWarn({ message, onClose }: { message: string[]; onClose: () => void }) {
    return <ToastCore message={message} bgColor="bg-yellow-500" textColor="text-black" onClose={onClose} />;
}
