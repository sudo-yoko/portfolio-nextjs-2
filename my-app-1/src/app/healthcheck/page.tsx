export { default } from '@/presentation/healthcheck/views/healthcheck.page';

// 動的レンダリングに強制変更する
// productionビルドで、ServerCompoenetのサーバーサイドhttpリクエストが実行されてしまうため。
export const dynamic = 'force-dynamic';
