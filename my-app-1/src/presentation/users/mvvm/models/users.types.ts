/**
 * 入力フォームのキー。
 * 検索条件のユーザー名、
 */
export const FormKeys = {
    keyword: 'keyword',
} as const;
export type FormKeys = (typeof FormKeys)[keyof typeof FormKeys]; // 値から型を作る
// export type FormKeys = keyof typeof FormKeys  // キーから型を作る
// export type FormKeys = 'userName' | 'count';

/**
 * クエリ文字列のオブジェクト型
 */
// TODO: バックエンド呼び出しで使うためstringとする。（viewではnumberで扱う）
export type UsersQuery = {
    offset: string;
    limit: string;
};

/**
 * ユーザー情報
 */
export type User = {
    userId: string;
    userName: string;
};

/**
 * ユーザーリスト
 */
export type Users = {
    total: number;
    users: User[];
};
