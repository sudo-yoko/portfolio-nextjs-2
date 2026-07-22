// クライアントサイド共通処理 AOP部品（カスタムフック版）
'use client';
// import 'client-only';

import { useRouter } from 'next/navigation';

import { formatError, getCustomErrorProperties } from '@/presentation/_system/error/error.helper.stringify';
import { isCustomError } from '@/presentation/_system/error/error.helpers';
import logger from '@/presentation/_system/logging/logger.c';

const logPrefix = 'aspect.client.useWithAdvice.ts: ';

export function useWithAdvice() {
    const router = useRouter();

    /**
     * エラーハンドリングを追加して実行する
     *
     * @param subject 実行する関数（戻り値の無い関数であること）
     */
    const withAdvice = (subject: () => void): void => {
        const location = 'withAdvice';
        try {
            subject();
        } catch (error) {
            handleError(location, error);
        }
    };

    /**
     * エラーハンドリングを追加して実行する
     *
     * @param subject 実行する非同期関数（戻り値の無い関数であること）
     */
    const withAdviceAsync = async (subject: () => Promise<void>): Promise<void> => {
        const location = 'withAdviceAsync';
        try {
            await subject();
        } catch (error) {
            handleError(location, error);
        }
    };

    function handleError(location: string, error: unknown): void {
        const errProps: Parameters<typeof formatError>[0] = {};
        errProps.error = error;
        errProps.location = location;
        // カスタムエラー固有のプロパティを取得する
        if (isCustomError(error)) {
            const option = getCustomErrorProperties(error);
            errProps.option = option;
        }
        // ログ出力
        const { all } = formatError(errProps);
        void logger.errorAsync(logPrefix + all);
        router.push('/system-error');
    }

    return { withAdvice, withAdviceAsync };
}
