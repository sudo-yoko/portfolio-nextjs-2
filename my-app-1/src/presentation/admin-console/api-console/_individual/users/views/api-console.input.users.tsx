'use client';

import {
    reducer,
    setValue,
} from '@/presentation/admin-console/api-console/_individual/_shared/view-models/api-console.individual.reducer';
import {
    ActionButton,
    SectionField,
    SectionLabelQueryParameter,
    ValidationError,
} from '@/presentation/admin-console/api-console/_individual/_shared/views/api-console.input.parts';
import { FormKeys } from '@/presentation/admin-console/api-console/_individual/users/models/api-console.users.types';
import { initialState } from '@/presentation/admin-console/api-console/_individual/users/view-models/api-console.users.reducer';
import {
    Action as ParentAction,
    State,
} from '@/presentation/admin-console/api-console/view-models/api-console.reducer';
import { useReducer } from 'react';

export function UsersIndividualForm({
    parentState,
    parentDispatch,
}: {
    parentState: State;
    parentDispatch: React.Dispatch<ParentAction>;
}) {
    const [state, dispatch] = useReducer(reducer<FormKeys>, initialState);
    return (
        <div className="flex-1 space-y-6">
            <div className="space-y-3">
                <SectionLabelQueryParameter />
                <SectionField
                    field={FormKeys.offset}
                    value={state.formData.offset}
                    onChange={(value) => setValue(dispatch, FormKeys.offset, value)}
                />
                {state.violationsMap.offset?.map((err, index) => (
                    <ValidationError key={index}>{err}</ValidationError>
                ))}
                <SectionField
                    field={FormKeys.limit}
                    value={state.formData.limit}
                    onChange={(value) => setValue(dispatch, FormKeys.limit, value)}
                />
                {state.violationsMap.limit?.map((err, index) => (
                    <ValidationError key={index}>{err}</ValidationError>
                ))}
                <SectionField
                    field={FormKeys.userId}
                    value={state.formData.userId}
                    onChange={(value) => setValue(dispatch, FormKeys.userId, value)}
                />
                {state.violationsMap.userId?.map((err, index) => (
                    <ValidationError key={index}>{err}</ValidationError>
                ))}
                <SectionField
                    field={FormKeys.userName}
                    value={state.formData.userName}
                    onChange={(value) => setValue(dispatch, FormKeys.userName, value)}
                />
                {state.violationsMap.userName?.map((err, index) => (
                    <ValidationError key={index}>{err}</ValidationError>
                ))}
            </div>
            <ActionButton
                onRun={() => {
                    return;
                }}
                parentDispatch={parentDispatch}
            />
        </div>
    );
}
