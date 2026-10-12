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
 * 環境変数取得（動的プロパティ参照）
 */
export const env = (key: string) => process.env[key];
