import { MenuInfo, MenuResult } from '@/presentation/(system)/menu/mvvm/models/menu.types';
import { Tag } from '@/presentation/(system)/result/result.core.types';

/**
 * バックエンド呼び出しのインターフェース型
 */
type FetchMenuInfo = {
    (): Promise<MenuResult>;
};

/**
 * モックコード
 */
const mock: FetchMenuInfo = async () => {
    await new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, 5000);
    });
    const result: MenuResult = {
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

export const fetchMenuInfo: FetchMenuInfo = mock;
