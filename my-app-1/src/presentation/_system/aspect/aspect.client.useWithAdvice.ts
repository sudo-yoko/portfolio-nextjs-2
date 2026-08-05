// クライアントサイド共通処理 AOP部品（カスタムフック版）
'use client';
// import 'client-only';

import { useWithErrorHandling } from '@/presentation/_system/aspect/internal/aspect.error-handling.client.useWithErrorHandling';

const logPrefix = 'aspect.client.useWithAdvice.ts: ';

export function useWithAdvice() {
    const { withErrorHandling, withErrorHandlingAsync } = useWithErrorHandling();

    const withAdvice = (subject: () => void): void => {
        withErrorHandling(() => subject());
    };

    const withAdviceAsync = async (subject: () => Promise<void>): Promise<void> => {
        await withErrorHandlingAsync(() => subject());
    };

    return { withAdvice, withAdviceAsync };
}
