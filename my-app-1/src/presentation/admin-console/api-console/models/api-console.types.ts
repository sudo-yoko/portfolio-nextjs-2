import { Aborted, OkData } from '@/presentation/(system)/result/result.core.types';
import { JSX } from 'react';

export type Item = {
    id: string;
    method: string;
    path: string;
    description: string;
    inputFormFactory: InputFormFactory;
};

export type ApiResponse = {
    status: string;
    body?: string;
};

export type ApiResult = OkData<ApiResponse> | Aborted;

export type InputFormFactory = () => JSX.Element;
