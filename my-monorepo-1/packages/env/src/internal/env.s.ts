//
// 環境変数をラップする
//
// テストで環境変数取得をモックしやすいようにするためのラッパー。
// サーバーサイド専用
//
// ※環境変数は、env関数が呼ばれたときに読み込まれる
//
import 'server-only';

/**
 * 環境変数を取得する
 *
 * @param key - 環境変数名
 * @returns 環境変数値
 */
// export const env = (key: string) => process.env[key];

/**
 * 環境変数オブジェクト
 */
export const env = {
    get node_env() {
        return process.env.NODE_ENV;
    },
    get next_runtime() {
        return process.env.NEXT_RUNTIME;
    },
    get(key: string) {
        return process.env[key];
    },
};
