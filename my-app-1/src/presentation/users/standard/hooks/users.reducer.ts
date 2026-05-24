import 'client-only';

import { State, Step } from '@/presentation/_system/pagination/standard/hooks/pagination.reducer';
import { initialFormDataCore } from '@/presentation/_system/validation/validation.helpers';
import { FormData } from '@/presentation/_system/validation/validation.types';
import { FormKeys, User } from '@/presentation/users/standard/models/users.types';

export const initialPage = 1;
export const perPage = 4;

export const initialState: State<User[], FormKeys> = {
    step: Step.Idle,
    formData: initialFormData(),
    items: [],
    page: 0,
    violations: [],
    violationsMap: {},
    error: false,
};

function initialFormData(): FormData<FormKeys> {
    const initial = initialFormDataCore(FormKeys);
    return initial;
}
