import { Aborted, OkData, Retryable } from '@/presentation/(system)/result/result.core.types';

export type Header = {
    profile: {
        userName: string;
        orgName: string;
        mailAddress: string;
    };
};

export type HeaderResult = OkData<Header> | Retryable | Aborted;
