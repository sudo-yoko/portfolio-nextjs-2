# Tips

### Prettier

* コード整形すると、読み込まれた .prettierrc.cjs の内容が、コンソールの「出力」タブに出力される。.prettierrc.cjs を修正したのに反映されなていない時は、codespaceをいったん切断し、再接続する。

* VSCode の設定
``` js
// settings.json
"editor.detectIndentation": false,
"editor.tabSize": 4
```
エディターで、スペース 4 つごとに縦線が入るようになる。.prettierrc.cjs の tabWidth も 4 にするとインデントと縦線が一致して見やすくなる。

* 特定ディレクトリ配下をすべて整形
``` bash
npx prettier --write src/app/api/users
npx prettier --write "src/app/(system)"
```
