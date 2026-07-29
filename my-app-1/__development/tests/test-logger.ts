import { consoleHeader } from '@/presentation/_system/logging/logging.utils';

/**
 * コンソールログ出力関数を返す。
 *
 * Jestでconsole.logを行うと、ログの前後に余分な情報が付加されて見づらくなる。
 * useStdoutにtrueを設定することで、直接process.stdout.writeでログ出力できる関数。
 */
export function printf({ logPrefix, stdout }: { logPrefix: string; stdout: boolean }) {
    return (...s: unknown[]) => {
        const message = [consoleHeader, logPrefix, ...s];
        return stdout ? process.stdout.write(message.join(' ') + '\n') : console.log(...message);
    };
}
