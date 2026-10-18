/**
 * 環境変数 NODE_ENV 定義
 */
export const NodeEnvNext = {
    Dev: 'development',
    Prod: 'production',
    Test: 'test',
} as const;
export type NodeEnvNext = (typeof NodeEnvNext)[keyof typeof NodeEnvNext];

/**
 * 環境変数 プロトコル値の定義
 */
export const Protocol = {
    Http: 'http',
    Https: 'https',
} as const;
export type Protocol = (typeof Protocol)[keyof typeof Protocol];
