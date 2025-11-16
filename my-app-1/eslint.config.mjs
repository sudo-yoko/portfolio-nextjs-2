import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import eslintConfigPrettier from 'eslint-config-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';

const eslintConfig = defineConfig([
  /**
   * ユーザー体験・パフォーマンスに関するルール（Next.js 推奨の使い方）
   */
  ...nextVitals,

  /**
   * TypeScript関連のルール（Next.js 推奨の使い方）
   */
  ...nextTs,

  /**
   * lint 対象外フォルダ
   */
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'coverage/**']),

  /**
   * 未使用の変数についてのルール
   */
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn', // 未使用の変数は警告とする
        {
          vars: 'all', // すべての変数をチェックする。（let、const、function、class、import の変数 など）
          args: 'after-used', // 関数引数のチェック方法
          ignoreRestSiblings: true, // オブジェクト分割代入で 残りの変数をスキップする場合の警告を無視する。
          argsIgnorePattern: '^_', // 関数の引数（args）が _ で始まる場合は使用しなくても OK
          varsIgnorePattern: '^_', // 変数名が _ で始まるとチェックしない
          caughtErrorsIgnorePattern: '^_', // try/catch の catch 引数が _ で始まる場合は未使用 OK
        },
      ],
    },
  },
  // Prettierと競合するESLintの整形系ルールを無効化する。
  eslintConfigPrettier,
]);

export default eslintConfig;
