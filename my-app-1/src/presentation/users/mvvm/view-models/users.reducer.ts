import 'client-only';

import { State, Step } from '@/presentation/(system)/pagination/mvvm/view-models/pagination.reducer';
import { FormData } from '@/presentation/(system)/validation/validation.types';
import { FormKeys, User } from '@/presentation/users/mvvm/models/users.types';

export const initialState: State<User[], FormKeys> = {
    step: Step.Initial,
    query: initialFormData(),
    items: [],
    page: 0,
    violations: [],
    violationsMap: {},
};

function initialFormData(): FormData<FormKeys> {
    const initial = Object.fromEntries(Object.values(FormKeys).map((key) => [key, ''])) as FormData<FormKeys>;
    return initial;
}
