import { consoleHeader } from '@/presentation/_system/console-header';

const logPrefix = 'instrumentation.register.ts:';
export async function register() {
    console.log(`${consoleHeader} ${logPrefix} register start.`);
    console.log(`${consoleHeader} ${logPrefix} NEXT_RUNTIME=${process.env.NEXT_RUNTIME}`);
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        // Next.jsサーバー起動時に、グローバルインスタンスを読み込んでおく
        await import('@/presentation/_system/logging/internal/logging.debug.core');
        await import('@/presentation/_system/logging/internal/logging.winston.core');
        await import('@/presentation/_system/client/internal/client.axios');
    } else if (process.env.NEXT_RUNTIME === 'edge') {
    } else {
    }
    console.log(`${consoleHeader} ${logPrefix} register end.`);
}
