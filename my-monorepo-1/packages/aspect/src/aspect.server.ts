import 'server-only';

import logger from '@my/logger/server';

import { Aspect, AspectAsync } from '#aspect/aspect.types';
import { chainAspects, chainAspectsAsync } from '#aspect/aspect.utils';
import { withAuth, withAuthAsync } from '#aspect/internal/aspect.auth';
import { withErrorHandling, withErrorHandlingAsync } from '#aspect/internal/aspect.error-handling.server';
import { createWithLogging, createWithLoggingAsync, Ctx } from '#aspect/internal/aspect.logging';

const logPrefix = 'aspect.server.ts: ';

/**
 * 引数に渡されたサンクに共通処理を追加して実行する。
 */
export function withAdvice<T>(subject: () => T) {
    // サーバーサイドロガーを設定してロギングアスペクトを作成する
    const ctx: Ctx = { logger, logPrefix, process: 'sync server process' };
    const withLogging = createWithLogging(ctx);

    // アスペクトを登録する
    const aspects: Aspect[] = [];
    aspects.push(withAuth); // 認証処理
    aspects.push(withErrorHandling); // エラーハンドリング
    aspects.push(withLogging); // 開始・終了ログ

    // アスペクトを適用して実行する
    return chainAspects(subject, aspects);
}

/**
 * 引数に渡されたサンクに共通処理を追加して実行する。
 */
export async function withAdviceAsync<T>(subject: () => Promise<T>) {
    const ctx: Ctx = { logger, logPrefix, process: 'async server process' };
    const withLoggingAsync = createWithLoggingAsync(ctx);

    const aspects: AspectAsync[] = [];
    aspects.push(withAuthAsync);
    aspects.push(withErrorHandlingAsync);
    aspects.push(withLoggingAsync);
    return await chainAspectsAsync(subject, aspects);
}
