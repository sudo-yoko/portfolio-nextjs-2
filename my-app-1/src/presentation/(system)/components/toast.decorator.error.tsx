//
// トースト通知 エラー
//
'use client';

import { ToastCore } from '@/presentation/(system)/components/toast.core';

export function ToastError({ message }: { message: string[] }) {
    return <ToastCore message={message} bgColor="bg-red-500" textColor="text-white" />;
}
