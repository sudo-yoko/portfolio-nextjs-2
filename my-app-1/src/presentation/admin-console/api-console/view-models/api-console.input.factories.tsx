'use client';

import { CustomersIndividualForm } from '@/presentation/admin-console/api-console/_individual/customers/views/api-console.input.customers';
import { UsersIndividualForm } from '@/presentation/admin-console/api-console/_individual/users/views/api-console.input.users';
import { IndividualFormFactory } from '@/presentation/admin-console/api-console/models/api-console.types';
import { Action, State } from '@/presentation/admin-console/api-console/view-models/api-console.reducer';
import { RocketLaunchIcon } from '@heroicons/react/24/outline';
import React from 'react';

export const createCustomersIndividualForm: IndividualFormFactory = (
    state: State,
    dispatch: React.Dispatch<Action>,
) => {
    return <CustomersIndividualForm parentState={state} parentDispatch={dispatch} />;
};

export const createUsersIndividualForm: IndividualFormFactory = (state: State, dispatch: React.Dispatch<Action>) => {
    return <UsersIndividualForm parentState={state} parentDispatch={dispatch} />;
};

export const createDummyIndividualForm: IndividualFormFactory = (_state: State, _dispatch: React.Dispatch<Action>) => {
    return (
        <div className="flex h-full flex-col items-center justify-center gap-3 opacity-40">
            <RocketLaunchIcon className="size-10 text-indigo-300/50" />
            <p className="text-sm text-slate-200 italic">準備中・・・</p>
        </div>
    );
};
