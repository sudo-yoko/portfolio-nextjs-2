Prettier

コード整形すると、コンソールの「出力」タブに.prettierrc.cjsの内容が出力される。
.prettierrc.cjsを修正しても反映されなていない時は、codespaceをいったん切断し、再接続する

setting.json
  "editor.detectIndentation": false,
  "editor.tabSize": 4
→エディターで、スペース４つごとの縦線が入るようになる。.prettierrc.cjsのtabWidthも４にするとインデントと縦線が一致して見やすくなる

特定ディレクトリ配下をすべて整形
npx prettier --write src/app/api/users
npx prettier --write "src/app/(system)"

