import { Aborted, OkData } from '@/presentation/_system/result/result.core.types';
import { Action, State } from '@/presentation/admin-console/api-console/view-models/api-console.reducer';

export type IndividualFormProps = { parentState: State; parentDispatch: React.Dispatch<Action> };
export type IndividualFormComponent = React.ComponentType<IndividualFormProps>;

export type Item = {
    id: string;
    method: string;
    path: string;
    description: string;
    individualForm: IndividualFormComponent;
};

export type ApiResponse = {
    responseTime: number;
    status: string;
    body?: string;
};

export type ApiResult = OkData<ApiResponse> | Aborted;
