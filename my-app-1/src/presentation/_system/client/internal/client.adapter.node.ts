import 'server-only';

import http from 'node:http';

import { defaultValidateStatusServer } from '@/presentation/_system/client/client.constants';
import { Client, Result } from '@/presentation/_system/client/client.types';
import { httpRequestError, httpResponseError } from '@/presentation/_system/error/error.factories';
import { getNodeErrorProperties, stringify } from '@/presentation/_system/error/error.helper.stringify';
import logger from '@/presentation/_system/logging/logger.s';

const logPrefix = 'client.adapter.node.ts: ';

export const createNodeClient = (): Client => ({
    send: async (config) => {
        logger.info(logPrefix + `config=${JSON.stringify(config)}`);

        const validateStatus = config.validateStatus ?? defaultValidateStatusServer;

        const url = new URL(config.url);
        if (url.protocol !== 'http:') {
            throw new Error('Not implemented');
        }
        config.query?.forEach(({ key, value }) => url.searchParams.append(key, value));

        const options: http.RequestOptions = {};
        options.timeout = config.timeout;

        return new Promise((resolve, reject) => {
            logger.info(logPrefix + '### Request started');
            //
            // リクエスト実行
            //
            const req = http.get(url, options, (res) => {
                logger.info(logPrefix + `### Received response -> ${res.statusCode}`);
                res.setEncoding('utf8');
                //
                // レスポンスステータスの検証
                //
                if (!res.statusCode) {
                    // throw new Error();
                    res.resume();
                    return reject(
                        httpResponseError({
                            status: res.statusCode,
                            description: 'ステータスコードがundefined',
                        }),
                    );
                }
                const { statusCode } = res;
                // logger.info(logPrefix + `### Received response -> ${res.statusCode} ${http.STATUS_CODES[res.statusCode]}`);
                if (validateStatus(statusCode)) {
                    // throw new Error();
                    res.resume();
                    return reject(
                        httpResponseError({
                            status: statusCode,
                            description: 'エラーステータスが返りました。',
                        }),
                    );
                }
                //
                // IncomingMessageイベント
                //
                let rawBody = '';
                res.on('data', (chunk) => {
                    logger.info(logPrefix + '### Received chunk');
                    rawBody += chunk;
                });
                // レスポンス側のエラー監視
                res.on('error', (error) => {
                    logger.info(logPrefix + '### Response error');
                    const details = getNodeErrorProperties(error);
                    logger.info(logPrefix + stringify({ error, details }).all);
                    reject(httpResponseError({ cause: error }));
                });
                res.on('close', () => {
                    logger.info(logPrefix + '### Connection closed');
                });
                res.on('end', () => {
                    logger.info(logPrefix + '### Response data end' + rawBody);
                    const result: Result = { status: statusCode, rawBody };
                    resolve(result);
                });
                // TODO; 中断は未実装
                // res.on('aborted', () => {
                //     logger.info(logPrefix + '### Connection aborted');
                //     throw new Error();
                // });
            });
            //
            // Client Request イベント
            //
            // クライアント側エラー
            req.on('error', (error) => {
                // Errorオブジェクトの拡張プロパティを取得する。node:http固有のエラーが含まれているため。
                const details = getNodeErrorProperties(error);
                logger.info(logPrefix + '### Request error' + stringify({ error, details }).all);
                // TODO: unknown type errorが出ている
                reject(httpRequestError({ cause: error }));
            });
            // 無応答・無通信状態の継続時間(アイドルタイムアウト)
            req.on('timeout', () => {
                logger.info(logPrefix + '### Request timeout');
                req.destroy();
            });
        });
    },
});
