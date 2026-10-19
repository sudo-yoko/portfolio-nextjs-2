//
// 環境変数をラップする
//
// テストで環境変数取得をモックしやすいようにするためのラッパー。
// サーバーサイド専用
//
import 'server-only';

/**
 * 環境変数定義オブジェクト
 */
export const env_s = {
    get enable_logger_initialization() {
        return process.env.ENABLE_LOGGER_INITIALIZATION;
    },
    get(key: string) {
        return process.env[key];
    },
};
