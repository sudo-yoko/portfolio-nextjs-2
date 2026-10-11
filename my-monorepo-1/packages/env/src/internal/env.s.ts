//
// 環境変数をラップする
//
// テストで環境変数取得をモックしやすいようにするためのラッパー。
// サーバーサイド専用
//
import 'server-only';

/**
 * 環境変数取得（動的プロパティ参照）
 */
export const env = (key: string) => process.env[key];
