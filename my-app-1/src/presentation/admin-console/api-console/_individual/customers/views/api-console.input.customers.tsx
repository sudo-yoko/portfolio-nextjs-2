'use client';

import {
    ActionButton,
    SectionField,
    SectionLabelPathParameter,
} from '@/presentation/admin-console/api-console/_individual/_shared/views/api-console.input.parts';
import { FormKeys } from '@/presentation/admin-console/api-console/_individual/customers/models/api-console.customers.types';
import {
    initialState,
    reducer,
    setValue,
} from '@/presentation/admin-console/api-console/_individual/customers/view-models/api-console.customers.reducer';
import { Action as ParentAction } from '@/presentation/admin-console/api-console/view-models/api-console.reducer';
import { useReducer } from 'react';
import { handleItemClear } from '../../../view-models/api-console.reducer.hooks';

export function CustomersInputForm({ parentDispatch }: { parentDispatch: React.Dispatch<ParentAction> }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    function handleRun() {
        
    }

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
            <ActionButton onRun={handleRun} onClear={() => handleItemClear(parentDispatch)} />
        </div>
    );
}
