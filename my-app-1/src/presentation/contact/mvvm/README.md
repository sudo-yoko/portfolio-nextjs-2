# Contact MVVM の境界

4層は維持し、ファイルの種類ではなく責務と実行環境で分ける。

| モジュール | 責務 | 含めないもの |
| --- | --- | --- |
| `bff` | サーバー境界。Route / Server Action、リクエストの構造検証、ページのクエリ取得、再バリデーションとバックエンド呼び出し | React の画面状態 |
| `models` | 入力・結果の型、共通の入力ルール、ブラウザー側の送信窓口 | Request / searchParams、画面遷移 |
| `view-models` | 画面状態、ユーザー操作、通信結果から画面遷移への変換 | JSX、サーバー専用処理 |
| `views` | 状態の表示と操作コールバックの接続。Page はサーバー側の組み立て役 | dispatch、通信の開始、エラー状態の同期 |

## 依存方向

- クライアント: `views → useContactViewModel → event-handler / reducer → models`
- サーバー: `views/contact.page → bff/request-handler`、`bff/route・action → interactor → models/validator・backend-lib`
- `models/contact.client` はクライアント用の通信アダプター。Route 呼び出しが現在の実装で、Server Action 呼び出しも代替として残している。Model 全体を純粋なドメイン層とは扱わない。
- `models/types・validator` は両環境で利用する。サーバー専用・クライアント専用のファイルを一括 export する barrel は設けない。

## 状態と副作用

- View の公開窓口は `useContactViewModel` の `state` と `actions`。reducer と event-handler は ViewModel 内部の実装。
- `violations` を唯一の保存元とし、`violationsMap` は表示時に導出する。View の Effect による二重管理をしない。
- 送信は確認画面の操作で開始する。Sending のマウントをトリガーにしない。フック内の ref で同一マウント中の連打を防ぐ（サーバー側の冪等性保証ではない）。
- 構造検証（必須フィールド・型）は bff の deserializer、入力ルールは共通 validator。サーバーの検証は省略しない。

## 今回変更していない点

- 住所検索は既存の未実装状態のまま。実装時は models の通信窓口を経由する。
- category / from は既存同様、取得・ログ出力のみで画面には未反映。
- Server Action の入力構造検証と、通信結果の Contact 専用の型検証は今後の改善点。既存の型アサーションは今回の責務整理とは分けて扱う。
- この規模では repository / use-case / port の追加階層は作らない。通信の差し替えや独立した業務ルールが必要になった時点で分離する。
