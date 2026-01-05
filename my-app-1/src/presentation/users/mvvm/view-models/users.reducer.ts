import 'client-only';

import { State, Step } from '@/presentation/(system)/pagination/mvvm/view-models/pagination.reducer.2';
import { FormData } from '@/presentation/(system)/validation/validation.types';
import { FormKeys, User } from '@/presentation/users/mvvm/models/users.types';

export const initialPage = 1;
export const perPage = 4;

export const initialState: State<User[], FormKeys> = {
    step: Step.Idle,
    query: initialFormData(),
    items: [],
    page: 0,
    violations: [],
    violationsMap: {},
    error: false,
};

function initialFormData(): FormData<FormKeys> {
    const initial = Object.fromEntries(Object.values(FormKeys).map((key) => [key, ''])) as FormData<FormKeys>;
    return initial;
}
