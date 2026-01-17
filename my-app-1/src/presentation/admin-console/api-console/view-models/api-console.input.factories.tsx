'use client';

import { CustomersInputForm } from '@/presentation/admin-console/api-console/_individual/customers/views/api-console.input.customers';
import { UsersInputForm } from '@/presentation/admin-console/api-console/_individual/users/views/api-console.input.users';
import { InputFormFactory } from '@/presentation/admin-console/api-console/models/api-console.types';
import { Action } from '@/presentation/admin-console/api-console/view-models/api-console.reducer';
import { RocketLaunchIcon } from '@heroicons/react/24/outline';
import React from 'react';

export const customersInputFormFactory: InputFormFactory = (dispatch: React.Dispatch<Action>) => {
    return <CustomersInputForm parentDispatch={dispatch} />;
};

export const usersInputFormFactory: InputFormFactory = (dispatch: React.Dispatch<Action>) => {
    return <UsersInputForm parentDispatch={dispatch} />;
};

export const dummyInputFormFactory: InputFormFactory = (_dispatch: React.Dispatch<Action>) => {
    return (
        <div className="flex h-full flex-col items-center justify-center gap-3 opacity-40">
            <RocketLaunchIcon className="size-10 text-indigo-300/50" />
            <p className="text-sm text-slate-200 italic">準備中・・・</p>
        </div>
    );
};
