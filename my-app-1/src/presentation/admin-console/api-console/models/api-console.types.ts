import { Aborted, OkData } from '@/presentation/(system)/result/result.core.types';
import { JSX } from 'react';

export type Item = {
    id: string;
    method: string;
    path: string;
    description: string;
    inputPanel?: () => JSX.Element;
};

export type ApiResponse = {
    status: string;
    body?: string;
};

export type ApiResult = OkData<ApiResponse> | Aborted;
