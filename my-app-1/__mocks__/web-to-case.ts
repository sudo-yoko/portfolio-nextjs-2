//
// Salesforce Web-to-Case エンドポイントのモック
//
// TODO: Express後継Koa
import cors from 'cors';
import type { Request, Response } from 'express';
import express from 'express';
import { delay, logging } from './utils';

const port = 3001;
const path = '/servlet/servlet.WebToCase';

const consolePrefix = '>>> ';
const logPrefix = '>>> web-to-case-mock: ';

// フォームデータ
interface FormData {
    name: string;
    email: string;
    body: string;
}

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// 独自ミドルウェア
app.use(delay(5000)); // 5秒待機して、処理待ち時間をシミュレートする
app.use(logging()); // リクエスト情報をログに出力

app.post(path, async (req: Request<undefined, undefined, FormData>, res: Response<void>) => {
    const body = req.body;
    console.log(logPrefix + `Request(Inbound) -> formData=${JSON.stringify(body)}`);
    // 1秒待機
    // await new Promise<void>((resolve) => {
    // setTimeout(() => {
    // resolve();
    // }, 1000);
    // });

    // const status = 200;
    // const status = 408;
    const status = 500;
    console.log(logPrefix + `Response(Outbound) -> status=${status}`);
    res.sendStatus(status);
});

app.listen(port, () => {
    console.log(consolePrefix + `Mock service running on http://localhost:${port} (web-to-case-mock)`);
});
