//
// トースト通知 装飾なし
//
'use client';

import { Toast } from '@/presentation/(system)/components/toast.core.decorator.non';

export function ToastSimple({ message, onDismiss }: { message: string[]; onDismiss: () => void }) {
    return <Toast message={message} bgColor="bg-white" textColor="text-black" onDismiss={onDismiss} />;
}
