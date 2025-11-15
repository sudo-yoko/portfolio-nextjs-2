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