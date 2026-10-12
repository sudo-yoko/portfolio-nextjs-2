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
export const env = (key: string) => process.env[key];
