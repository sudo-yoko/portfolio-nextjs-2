//
// バリデーション型
//

/**
 * 入力フォームの各フィールドの値を保持する
 */
export type FormData<FIELD extends string, VALUE = string> = Record<FIELD, VALUE>;

/**
 * バリデーションエラーメッセージを保持する
 */
export type Violation = string[];
// export type Violation<FIELD extends string> = { field: FIELD; messages: string[] };

/**
 * 入力フォームの各フィールドのバリデーションエラーメッセージを保持する
 */
// モデル側で扱いやすい List 形式
export type Violations<FIELD extends string> = { field: FIELD; violation: Violation }[]; // TODO: readonlyについて

/**
 * 入力フォームの各フィールドのバリデーションエラーメッセージを保持する
 */
// ビュー側で扱いやすい Mapped 形式
export type ViolationsMap<FIELD extends string> = {
    [F in FIELD]?: Violation;
};

/**
 * 単項目バリデーター型
 *
 * @typeParam VALUE - 検証する値の型。デフォルトは string
 * @param value - 検証する値
 * @param label - 検証する値の名前。バリデーションエラーのメッセージに使用する
 * @returns エラーメッセージの配列
 */
export type Validator<VALUE = string> = (value: VALUE, label: string) => Violation;

/**
 * フォームバリデーター型
 *
 * @typeParam FIELD - 入力フォームのフィールドキーの型
 * @param formData - 入力フォームの各フィールドの値を保持するオブジェクト
 * @returns 入力フォームの各フィールドのバリデーションエラーメッセージを保持するオブジェクト
 */
export type FormValidator<FIELD extends string> = (formData: FormData<FIELD>) => Violations<FIELD>;
