//
// 環境変数取得
//
// テストで環境変数取得をモックしやすいようにするためのラッパー。
// クライアントサイドとサーバーサイドの両方で使用されるもの
//

/**
 * 環境変数定義オブジェクト
 */
export const env = {
    get node_env() {
        return process.env.NODE_ENV;
    },
    get next_runtime() {
        return process.env.NEXT_RUNTIME;
    },
    get next_public_fw_debug_logger() {
        return process.env.NEXT_PUBLIC_FW_DEBUG_LOGGER;
    },
};
