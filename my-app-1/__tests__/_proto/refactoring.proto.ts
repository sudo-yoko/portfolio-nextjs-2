// リファクタリング耐性の検証

export const FormKeys = {
  userName: 'userName',
  aaa: 'aaa',
} as const;

export type FormKeys = (typeof FormKeys)[keyof typeof FormKeys]; // 値から型を作る

// type a = typeof FormKeys;
// type b = keyof a;
// type FormKeys = keyof typeof FormKeys; // キーから型を作る

export type Violation = string[];
export type Violations<FIELD extends string> = {
  [F in FIELD]?: Violation;
};

//type FormViolations = Violations<FormKey>;
const violations: Violations<FormKeys> = {};

// Violationsの場合はこの書き方でキーを指定するとリファクタリングで自動反映される
violations[FormKeys.userName] = ['aaaa'];

// Violationsの場合にこの書き方でキーをしていするとリファクタリングで自動反映されない
violations.userName = ['ssss'];
violations.aaa = ['該当データがありません。'];
violations['aaa'] = ['該当データがありません。'];

// violations[FormKeys.aaa] = ['該当データがありません。']; // これはコンパイルエラー。キーから型を作る場合、キーと値の定義が同じである必要がある
