import { Aborted, OkData } from '@/presentation/(system)/result/result.core.types';
import { JSX } from 'react';
import { State } from '../view-models/api-console.reducer';

export type Item = {
    id: string;
    method: string;
    path: string;
    description: string;
    inputPanel?: (state: State) => JSX.Element;
    params?: {
        path?: string;
        query?: string;
    };
};

export type ApiResponse = {
    status: string;
    body?: string;
};

export type ApiResult = OkData<ApiResponse> | Aborted;
