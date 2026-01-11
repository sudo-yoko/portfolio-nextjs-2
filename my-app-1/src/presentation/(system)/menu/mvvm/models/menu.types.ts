import { Aborted, OkData, Retryable } from '@/presentation/(system)/result/result.core.types';

export type MenuInfo = {
    profile: {
        userName: string;
        orgName: string;
        mailAddress: string;
    };
};

export type MenuResult = OkData<MenuInfo> | Retryable | Aborted;
