import { Aborted, OkData } from '@/presentation/_system/result/result.core.types';
import { Action, State } from '@/presentation/admin-console/api-console/view-models/api-console.reducer';
import { JSX } from 'react';

export type Item = {
    id: string;
    method: string;
    path: string;
    description: string;
    individualFormFactory: IndividualFormFactory;
};

export type IndividualFormFactory = (state: State, dispatch: React.Dispatch<Action>) => JSX.Element;

export type ApiResponse = {
    status: string;
    body?: string;
};

export type ApiResult = OkData<ApiResponse> | Aborted;
