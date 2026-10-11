//
// 環境変数取得
//
// テストで環境変数取得をモックしやすいようにするためのラッパー。
// クライアントサイドとサーバーサイドの両方で使用されるもの
//

/**
 * 環境変数 NODE_ENV
 * アプリケーション実行環境
 */
export const node_env = process.env.NODE_ENV;

/**
 * 環境変数 NEXT_PUBLIC_FW_DEBUG_LOGGER
 * デバッグログの強制出力（基盤用）
 */
export const next_public_fw_debug_logger = process.env.NEXT_PUBLIC_FW_DEBUG_LOGGER;
