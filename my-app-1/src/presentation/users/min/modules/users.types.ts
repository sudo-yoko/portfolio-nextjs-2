/**
 * 入力フォームのキー。
 * 検索条件のユーザー名、
 */
export const FormKeys = {
    userName: 'userName',
} as const;
export type FormKeys = (typeof FormKeys)[keyof typeof FormKeys]; // 値から型を作る
// export type FormKeys = keyof typeof FormKeys  // キーから型を作る
// export type FormKeys = 'userName' | 'count';

/**
 * 検索条件
 */
export type UsersQuery = {
    userId?: string;
    userName?: string;
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
