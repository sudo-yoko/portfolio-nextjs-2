'use client';

import { envValidateStringValue } from '@my/env';
import { formatError, getCustomErrorProperties, isAuthError, isCustomError } from '@my/error';
import logger from '@my/logger/browser';
import { useNavigation } from '@my/navigation/browser';

const logPrefix = 'aspect.browser.ts: ';

export function useWithAdvice() {
    const nav = useNavigation();

    /**
     *
     * @param subject - 実行する関数（戻り値の無い関数であること）
     */
    // TODO: onAbort引数の検討。エラー時にエラーモーダルを出したい場合の考慮
    const withAdvice = (subject: () => void, onAbort?: () => void): void => {
        const location = 'withAdvice';
        try {
            logger.info(`${logPrefix}>>>>>>>>>>>>>>>>>>>>> sync client process start.`);
            subject();
            logger.info(`${logPrefix}>>>>>>>>>>>>>>>>>>>>> sync client process end.`);
        } catch (error) {
            void handleError(location, error, onAbort);
            logger.error(`${logPrefix}>>>>>>>>>>>>>>>>>>>>> sync client process error end.`);
        }
    };

    /**
     *
     * @param subject - 実行する非同期関数（戻り値の無い関数であること）
     */
    const withAdviceAsync = async (
        subject: () => Promise<void>,
        onAbort?: () => Promise<void>,
    ): Promise<void> => {
        const location = 'withAdviceAsync';
        try {
            logger.info(`${logPrefix}>>>>>>>>>>>>>>>>>>>>> async client process start.`);
            await subject();
            logger.info(`${logPrefix}>>>>>>>>>>>>>>>>>>>>> async client process end.`);
        } catch (error) {
            await handleError(location, error, onAbort);
            logger.error(`${logPrefix}>>>>>>>>>>>>>>>>>>>>> async client process error end.`);
        }
    };

    function handleError(
        location: string,
        error: unknown,
        onAbort?: () => void | Promise<void>,
    ): void | Promise<void> {
        const errProps: Parameters<typeof formatError>[0] = {};
        errProps.error = error;
        errProps.location = location;
        // カスタムエラー固有のプロパティを取得する
        if (isCustomError(error)) {
            const option = getCustomErrorProperties(error);
            errProps.details = option;
        }
        // ログ出力
        const { all } = formatError(errProps);
        void logger.error(logPrefix + all);
        // router.push('/system-error');
        if (onAbort) {
            return onAbort();
        } else {
            if (isAuthError(error)) {
                // 認証エラー
                const url = envValidateStringValue(process.env.NEXT_PUBLIC_AUTH_ERROR_DEFAULT, {
                    key: 'NEXT_PUBLIC_AUTH_ERROR_DEFAULT',
                });
                nav.navigatePage(url);
            } else {
                // システムエラー
                const url = envValidateStringValue(process.env.NEXT_PUBLIC_SYSTEM_ERROR_DEFAULT, {
                    key: 'NEXT_PUBLIC_SYSTEM_ERROR_DEFAULT',
                });
                nav.navigatePage(url);
            }
        }
    }

    return { withAdvice, withAdviceAsync };
}
