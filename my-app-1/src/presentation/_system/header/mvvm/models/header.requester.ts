import 'client-only';

import { HeaderResult } from '@/presentation/_system/header/mvvm/models/header.types';
import { Tag } from '@/presentation/_system/result/result.core.types';

/**
 * バックエンド呼び出しのインターフェース型
 */
type FetchHeader = {
    (): Promise<HeaderResult>;
};

/**
 * モックコード
 */
const mock: FetchHeader = async () => {
    await new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, 5000);
    });
    const result: HeaderResult = {
        tag: Tag.OkData,
        data: {
            profile: {
                userName: 'test taro',
                orgName: 'test company',
                mailAddress: 'test@taro.com',
            },
        },
    };
    return result;
};

export const fetchHeader: FetchHeader = mock;
