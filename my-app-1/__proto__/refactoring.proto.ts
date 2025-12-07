// リファクタリング耐性の検証

const FormKeys = {
  userName: 'userName',
  aaa: 'reason',
} as const;

// type FormKeys = (typeof FormKeys)[keyof typeof FormKeys]; // 値から型を作る
export type FormKeys = keyof typeof FormKeys; // キーから型を作る

export type Violation = string[];
export type Violations<FIELD extends string> = {
  [F in FIELD]?: Violation;
};

//type FormViolations = Violations<FormKey>;
const violations: Violations<FormKeys> = {};
violations.aaa = ['該当データがありません。'];
