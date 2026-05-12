import { Aborted, OkData, Retryable } from '@/presentation/_system/result/result.types';

export type Header = {
    profile: {
        userName: string;
        orgName: string;
        mailAddress: string;
    };
};

export type HeaderResult = OkData<Header> | Retryable | Aborted;
