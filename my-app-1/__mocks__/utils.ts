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

export function logging(): RequestHandler {
    return (req, _res, next) => {
        const { method, url, headers, params, query, body } = req;
        console.log({ method, url, headers, params, query, body });
        next();
    };
}
