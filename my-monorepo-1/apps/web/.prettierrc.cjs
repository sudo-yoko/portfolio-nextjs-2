module.exports = {
  ...require("../../.prettierrc.cjs"),

  // Next.jsアプリ側の設定
  // JSXではダブルクォートを使う（例: <div className="...">）
  jsxSingleQuote: false,

  // Tailwind CSS のクラス順を自動で整形
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
};
