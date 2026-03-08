import { delay, loggingReq, loggingRes } from '@/__mocks__/utils/express-middlewares';
import cors from 'cors';
import type { Request, Response } from 'express';
import express from 'express';

const logPrefix = 'users-mock';

const port = 3003;
const path = '/users';

interface QueryParam {
    offset: string;
    limit: string;
}

interface ReqQuery {
    offset: string;
    limit: string;
    userId?: string;
    userName?: string;
}

interface ReqBody {
    keyword: string;
    userId?: string;
    userName?: string;
}

interface ResBody {
    total: string;
    users: User[];
}

interface User {
    userId: string;
    userName: string;
}

const app = express();

app.use(express.json());
app.use(cors());

// 独自ミドルウェア
app.use(delay(1000)); // 1秒待機して、処理待ち時間をシミュレートする
app.use(loggingReq(logPrefix)); // リクエスト情報をログに出力
app.use(loggingRes(logPrefix)); // レスポンス情報をログに出力

/**
 * POST /users
 */
// TODO: 検索条件をボディにしてPOSTを使うなら、URLは 「POST /users/search」とか
app.post(path, async (req: Request<never, ResBody, ReqBody, QueryParam>, res: Response<ResBody>) => {
    const { offset, limit } = req.query;
    const { keyword, userId, userName } = req.body;
    handleRequest(res, offset, limit, keyword, userId, userName);
});

/**
 * GET /users
 */
// TODO: users/minのエンドポイントもPOSTにする
app.get(path, async (req: Request<never, ResBody, never, ReqQuery>, res: Response<ResBody>) => {
    //   const { method, url, query } = req;
    const { query } = req;
    const { offset, limit } = query;
    //   console.log(method, url);
    //   console.log(`query=${JSON.stringify(query)}`);
    handleRequest(res, offset, limit, '');
});

function handleRequest(
    res: Response<ResBody>,
    offset: string,
    limit: string,
    _keyword: string,
    _userId?: string,
    _userName?: string,
) {
    // テストデータを作成
    const total = 10;
    const users: User[] = [];
    for (let i = 0; i < total; i++) {
        const userId = String(i).padStart(5, '0');
        const userName = 'テスト 太郎' + i;
        users.push({ userId, userName });
    }

    //
    const segment = users.slice(Number(offset), Number(offset) + Number(limit));
    // console.log(`>>> users=${JSON.stringify(segment, null, 2)}`);

    const status = 200;
    const resBody: ResBody = {
        total: String(total),
        users: segment,
    };
    res.status(status).json(resBody);
}

app.listen(port, () => {
    console.log(`>>> Mock service running on http://localhost:${port} (users-mock)`);
});
