// リファクタリング耐性の検証

const FormKeys = {
  userName: 'userName',
  aaa: 'result',
} as const;

// type FormKeys = (typeof FormKeys)[keyof typeof FormKeys]; // 値から型を作る

// type a = typeof FormKeys;
// type b = keyof a;
type FormKeys = keyof typeof FormKeys; // キーから型を作る

export type Violation = string[];
export type Violations<FIELD extends string> = {
  [F in FIELD]?: Violation;
};

//type FormViolations = Violations<FormKey>;
const violations: Violations<FormKeys> = {};
violations.aaa = ['該当データがありません。'];
violations['aaa'] = ['該当データがありません。'];
// violations[FormKeys.aaa] = ['該当データがありません。']; // これはコンパイルエラー。キーから型を作る場合、キーと値の定義が同じである必要がある
