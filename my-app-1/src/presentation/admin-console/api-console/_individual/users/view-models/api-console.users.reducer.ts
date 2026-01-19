'use client';

import { initialFormDataCore } from '@/presentation/_system/validation/validation.helpers';
import { State } from '@/presentation/admin-console/api-console/_individual/_shared/view-models/api-console.individual.reducer';
import { FormKeys } from '@/presentation/admin-console/api-console/_individual/users/models/api-console.users.types';

export const initialState: State<FormKeys> = {
    formData: initialFormData(),
    violations: [],
    violationsMap: {},
};

export function initialFormData() {
    const initial = initialFormDataCore(FormKeys);
    initial.offset = '1';
    return initial;
}
