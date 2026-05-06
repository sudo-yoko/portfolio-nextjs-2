jest実行
    cross-env install

tsconfig の paths
    TypeScript コンパイラ側の設定
    VSCode の補完 / 型チェック
    主に “コンパイル時・開発時の世界”
    "paths": {
      "@/*": ["./src/*"],
      "@/__tests__/*": ["./__tests__/*"]
    }

Jest の moduleNameMapper
    テスト実行時に「そのパスは実際はこっち」と教える.Jest.unstable_mockModuleでのパス指定
    主に “テスト実行時（ランタイム）の世界”

RESULT型
・Client型はステータスと生のボディ(string)を返す
・ルートハンドラーはレスポンスボディにRESULT型を返す。ステータスコードは必ず200を返す
・ServerActionはRESULT型を返す
