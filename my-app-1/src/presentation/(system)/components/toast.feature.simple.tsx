//
// トースト通知 装飾なし
//
'use client';

import { Toast } from '@/presentation/(system)/components/toast.core.decorator.non';

export function ToastSimple({ message, onClose }: { message: string[]; onClose: () => void }) {
    return <Toast message={message} bgColor="bg-white" textColor="text-black" onClose={onClose} />;
}
