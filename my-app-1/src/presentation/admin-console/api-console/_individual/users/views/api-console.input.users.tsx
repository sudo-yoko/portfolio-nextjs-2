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
    SectionLabelQueryParameter,
    ValidationError,
} from '@/presentation/admin-console/api-console/_individual/_shared/views/api-console.input.parts';
import { sendRequest } from '@/presentation/admin-console/api-console/_individual/users/models/api-console.requester.users';
import { FormKeys } from '@/presentation/admin-console/api-console/_individual/users/models/api-console.users.types';
import { validate } from '@/presentation/admin-console/api-console/_individual/users/models/api-console.users.validator';
import { initialState } from '@/presentation/admin-console/api-console/_individual/users/view-models/api-console.users.reducer';
import {
    Action as ParentAction,
    startProcess,
    State,
    Step,
    toIdle,
} from '@/presentation/admin-console/api-console/view-models/api-console.reducer';
import { useEffect, useReducer } from 'react';

export function UsersIndividualForm({
    parentState,
    parentDispatch,
}: {
    parentState: State;
    parentDispatch: React.Dispatch<ParentAction>;
}) {
    const [state, dispatch] = useReducer(reducer<FormKeys>, initialState);

    useEffect(() => {
        if (parentState.step === Step.Processing) {
            // TODO; エラーハンドリング
            void sendRequest(state.formData).then((result) => {
                if (isOkData(result)) {
                    toIdle(parentDispatch, result.data);
                }
            });
        }
    });

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
                <SectionLabelQueryParameter />
                {/* offset */}
                <SectionField
                    field={FormKeys.offset}
                    value={state.formData.offset}
                    onChange={(value) => setValue(dispatch, FormKeys.offset, value)}
                />
                {state.violationsMap.offset?.map((err, index) => (
                    <ValidationError key={index}>{err}</ValidationError>
                ))}
                {/* limit */}
                <SectionField
                    field={FormKeys.limit}
                    value={state.formData.limit}
                    onChange={(value) => setValue(dispatch, FormKeys.limit, value)}
                />
                {state.violationsMap.limit?.map((err, index) => (
                    <ValidationError key={index}>{err}</ValidationError>
                ))}
                {/* userId */}
                <SectionField
                    field={FormKeys.userId}
                    value={state.formData.userId}
                    onChange={(value) => setValue(dispatch, FormKeys.userId, value)}
                />
                {state.violationsMap.userId?.map((err, index) => (
                    <ValidationError key={index}>{err}</ValidationError>
                ))}
                {/* userName */}
                <SectionField
                    field={FormKeys.userName}
                    value={state.formData.userName}
                    onChange={(value) => setValue(dispatch, FormKeys.userName, value)}
                />
                {state.violationsMap.userName?.map((err, index) => (
                    <ValidationError key={index}>{err}</ValidationError>
                ))}
            </div>
            <ActionButton onRun={handleRun} parentDispatch={parentDispatch} />
        </div>
    );
}
