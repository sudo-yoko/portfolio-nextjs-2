import { QueryParam } from '@/presentation/_system/client/client.types';

export function queryParam(params: Record<string, string | string[]>): QueryParam {
    // TODO: mapとflatMapの違い
    return Object.entries(params).flatMap(([key, value]) => {
        if (Array.isArray(value)) {
            return value.map((v) => ({ key, value: v }));
        } else {
            return { key, value };
        }
    });
}
