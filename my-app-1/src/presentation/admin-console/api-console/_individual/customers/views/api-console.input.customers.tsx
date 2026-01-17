'use client';

import { hasError } from '@/presentation/_system/validation/validation.helpers';
import {
    ActionButton,
    SectionField,
    SectionLabelPathParameter,
} from '@/presentation/admin-console/api-console/_individual/_shared/views/api-console.input.parts';
import { FormKeys } from '@/presentation/admin-console/api-console/_individual/customers/models/api-console.customers.types';
import { validate } from '@/presentation/admin-console/api-console/_individual/customers/models/api-console.customers.validator';
import {
    initialState,
    reducer,
    setValue,
    setViolations,
} from '@/presentation/admin-console/api-console/_individual/customers/view-models/api-console.customers.reducer';
import { Action as ParentAction } from '@/presentation/admin-console/api-console/view-models/api-console.reducer';
import { useReducer } from 'react';

export function CustomersInputForm({ parentDispatch }: { parentDispatch: React.Dispatch<ParentAction> }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    function handleRun() {
        const violations = validate(state.formData);
        if (hasError(violations)) {
            setViolations(dispatch, violations);
            return;
        }
        setViolations(dispatch, []);
    }

    return (
        <div className="flex-1 space-y-6">
            <div className="space-y-3">
                <SectionLabelPathParameter />
                <SectionField
                    field="customerId"
                    value={state.formData.customerId}
                    onChange={(value) => setValue(dispatch, FormKeys.customerId, value)}
                />
                {state.violationsMap.customerId?.map((err, index) => (
                    <div key={index}>
                        <p className="text-sm text-red-500">{err}</p>
                    </div>
                ))}
            </div>
            <ActionButton onRun={handleRun} parentDispatch={parentDispatch} />
        </div>
    );
}
