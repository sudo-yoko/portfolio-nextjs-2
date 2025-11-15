module.exports = {
  // 1行の最大文字数（長すぎる行を自動で改行）
  printWidth: 110,

  // 文字列リテラルをシングルクォートに統一
  singleQuote: true,

  // JSXではダブルクォートを使う（例: <div className="...">）
  jsxSingleQuote: false,

  // Tailwind CSS のクラス順を自動で整形
  plugins: ['prettier-plugin-tailwindcss'],
};

