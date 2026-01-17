'use client';

import {
    SectionField,
    SectionLabelPathParameter,
} from '@/presentation/admin-console/api-console/_individual/_shared/views/api-console.input.parts';
import { initialState, reducer, setValue } from '../view-models/api-console.customers.reducer';
import { useReducer } from 'react';
import { FormKeys } from '../models/api-console.customers.types';

export function CustomersInputForm() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div className="flex-1 space-y-6">
            <div className="space-y-3">
                <SectionLabelPathParameter />
                <SectionField
                    value={state.formData.customerId}
                    onChange={(value) => setValue(dispatch, FormKeys.customerId, value)}
                    field="customerId"
                />
            </div>
        </div>
    );
}
