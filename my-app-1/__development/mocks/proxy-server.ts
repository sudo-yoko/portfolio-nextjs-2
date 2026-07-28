//
// プロキシサーバーのモック。プロキシ転送を模倣する。（HTTPフォワードプロキシ）
//
// curl -x http://localhost:9999 -X POST http://localhost:3001/servlet/servlet.WebToCase?encoding=UTF-8 -H "Content-Type: application/x-www-form-urlencoded" -d "name=111&email=eeee"
//
import http, { IncomingMessage, ServerResponse } from 'http';
import httpProxy from 'http-proxy';

import { consoleHeader } from '@/presentation/_system/logging/logging.utils';

const PORT = 9999;

const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    if (req.url) {
        const port = new URL(req.url).port;
        const target = `http://localhost:${port}`;
        console.log(`${consoleHeader} Proxying -> method=${req.method}, url=${req.url} target=${target}`);
        // リクエストをプロキシ転送する
        proxy.web(req, res, { target });
    }
});

server.listen(PORT, () => {
    console.log(`${consoleHeader} Mock service running on http://localhost:${PORT} (proxy-service-mock)`);
});
