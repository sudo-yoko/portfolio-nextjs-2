'use client';

import { isOkData } from '@/presentation/_system/result/result.core.helpers';
import { hasError } from '@/presentation/_system/validation/validation.helpers';
import {
    reducer,
    setValue,
    setViolations,
} from '@/presentation/admin-console/api-console/_individual/_shared/view-models/api-console.individual.reducer';
import {
    ActionButton,
    SectionField,
    SectionLabelPathParameter,
    ValidationError,
} from '@/presentation/admin-console/api-console/_individual/_shared/views/api-console.input.parts';
import { FormKeys } from '@/presentation/admin-console/api-console/_individual/customers/models/api-console.customers.types';
import { validate } from '@/presentation/admin-console/api-console/_individual/customers/models/api-console.customers.validator';
import { sendRequest } from '@/presentation/admin-console/api-console/_individual/customers/models/api-console.customers.requester';
import { initialState } from '@/presentation/admin-console/api-console/_individual/customers/view-models/api-console.customers.reducer';
import {
    Action as ParentAction,
    State as ParentState,
    Step as ParentStep,
    startProcess,
    toIdle,
} from '@/presentation/admin-console/api-console/view-models/api-console.reducer';
import { useEffect, useReducer } from 'react';

export function CustomersIndividualForm({
    parentState,
    parentDispatch,
}: {
    parentState: ParentState;
    parentDispatch: React.Dispatch<ParentAction>;
}) {
    const [state, dispatch] = useReducer(reducer<FormKeys>, initialState);

    useEffect(() => {
        if (parentState.step === ParentStep.Processing) {
            // TODO; エラーハンドリング
            void sendRequest(state.formData).then((result) => {
                if (isOkData(result)) {
                    toIdle(parentDispatch, result.data);
                }
            });
        }
    }, [parentDispatch, parentState.step, state.formData]);

    function handleRun() {
        const violations = validate(state.formData);
        if (hasError(violations)) {
            setViolations(dispatch, violations);
            return;
        }
        setViolations(dispatch, []);
        startProcess(parentDispatch);
    }

    return (
        <div className="flex-1 space-y-6">
            <div className="space-y-3">
                <SectionLabelPathParameter />
                <SectionField
                    field={FormKeys.customerId}
                    value={state.formData.customerId}
                    onChange={(value) => setValue(dispatch, FormKeys.customerId, value)}
                />
                {state.violationsMap.customerId?.map((err, index) => (
                    <ValidationError key={index}>{err}</ValidationError>
                ))}
            </div>
            <ActionButton onRun={handleRun} parentDispatch={parentDispatch} />
        </div>
    );
}
