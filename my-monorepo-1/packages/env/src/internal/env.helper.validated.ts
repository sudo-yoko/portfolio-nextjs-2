import { node_env } from './env';

export const NodeEnvNext = {
    Dev: 'development',
    Prod: 'production',
    Test: 'test',
} as const;
export type NodeEnvNext = (typeof NodeEnvNext)[keyof typeof NodeEnvNext];

/**
 * 環境変数取得（Next.js アプリケーション実行環境）
 */
export function nodeEnvNext(): NodeEnvNext {
    const env = node_env;
    const isNodeEnvNext = (node_env: string | undefined): node_env is NodeEnvNext => {
        if (node_env) {
            if ((Object.values(NodeEnvNext) as string[]).includes(node_env)) {
                return true;
            }
        }
        return false;
    };
    if (isNodeEnvNext(env)) {
        return env;
    }
    throw Error(`環境変数が不正です。process.env.NODE_ENV=${env}`);
}
