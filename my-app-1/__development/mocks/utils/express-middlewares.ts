// APIモック(express)用の独自ミドルウェア
import { RequestHandler } from 'express';

/**
 * 指定されたミリ秒で待機して、処理待ち時間をシミュレートする
 */
export function delay(ms: number): RequestHandler {
    return (_req, _res, next) => {
        setTimeout(() => {
            console.log(`>>> ${ms} ms delay done.`);
            next();
        }, ms);
    };
}

/**
 * リクエスト情報をコンソールに出力する
 */
export function loggingReq(logPrefix: string): RequestHandler {
    return (req, _res, next) => {
        const { method, url, headers, params, query, body } = req;
        console.log(`>>> [${logPrefix}] Request ->`, { method, url, headers, params, query, body });
        next();
    };
}

/**
 * レスポンス情報をコンソールに出力する
 */
export function loggingRes(logPrefix: string): RequestHandler {
    return (_req, res, next) => {
        // res.on('finish', () => {
        //     console.log(`>>> Response: status=${res.statusCode}`);
        // });
        const originalSend = res.send;
        res.send = function (body) {
            console.log(`>>> [${logPrefix}] Response -> status=${res.statusCode}, body=`, body);
            return originalSend.call(this, body);
        };
        next();
    };
}
