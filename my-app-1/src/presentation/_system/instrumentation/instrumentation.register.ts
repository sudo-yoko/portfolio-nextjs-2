import { consoleHeader } from '@/presentation/_system/logging/logging.utils';

const logPrefix = 'instrumentation.register.ts:';
export async function register() {
    console.log(`${consoleHeader} ${logPrefix} register start.`);
    console.log(`${consoleHeader} ${logPrefix} NEXT_RUNTIME=${process.env.NEXT_RUNTIME}`);
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        // Next.jsサーバー起動時に、グローバルインスタンスを読み込んでおく
        // TODO: instrumentationとServer Componentで読み込まれる領域が異なっているため期待通りにならない
        const debug = (await import('@/presentation/_system/logging/internal/logging.debug')).default;
        const logger = (await import('@/presentation/_system/logging/internal/logging.winston')).default;
        const client = (await import('@/presentation/_system/client/internal/client.axios')).default;
    } else if (process.env.NEXT_RUNTIME === 'edge') {
    } else {
    }
    console.log(`${consoleHeader} ${logPrefix} register end.`);
}
