const logPrefix = '>>> ';

const port = 3005;
const path = '/profile';

// TODO: import も export も1つも書かれていないファイルは、モジュールではなく「グローバルスクリプト」として扱われる。
// ここの内容はどこからでも参照できてしまう。srcフォルダにある定義されていないlogPrefixがコンパイルエラーにならないので、何かexportを追加することで
// グローバルスクリプトにならないようにする
export {};
