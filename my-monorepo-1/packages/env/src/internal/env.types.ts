/**
 * 環境変数 NODE_ENV 定義
 */
export const NodeEnv = {
    Dev: 'development',
    Prod: 'production',
    Test: 'test',
    Undef: undefined,
} as const;
export type NodeEnv = (typeof NodeEnv)[keyof typeof NodeEnv];

/**
 * 環境変数 NODE_ENV 定義(Next.jsアプリケーション向け)
 */
export const NodeEnvNext = {
    Dev: 'development',
    Prod: 'production',
    Test: 'test',
} as const;
export type NodeEnvNext = (typeof NodeEnvNext)[keyof typeof NodeEnvNext];

/**
 * 環境変数 NEXT_RUNTIME
 */
export const NextRuntime = {
    Nodejs: 'nodejs',
    Edge: 'edge',
    Undef: undefined,
} as const;
export type NextRuntime = (typeof NextRuntime)[keyof typeof NextRuntime];

/**
 * 環境変数 プロトコル値の定義
 */
export const envProtocolString = {
    Http: 'http',
    Https: 'https',
} as const;
export type envProtocolString = (typeof envProtocolString)[keyof typeof envProtocolString];

export const envBooleanString = {
    True: '1',
    False: '0',
} as const;
export type envBooleanString = (typeof envBooleanString)[keyof typeof envBooleanString];
