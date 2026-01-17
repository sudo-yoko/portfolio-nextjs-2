'use client';

import { CustomersInputForm } from '@/presentation/admin-console/api-console/_individual/customers/views/api-console.input.customers';
import { UsersInputForm } from '@/presentation/admin-console/api-console/_individual/users/views/api-console.input.users';
import { InputFormFactory } from '@/presentation/admin-console/api-console/models/api-console.types';
import { Action } from './api-console.reducer';
import React from 'react';

export const customersInputFormFactory: InputFormFactory = (dispatch: React.Dispatch<Action>) => {
    return <CustomersInputForm parentDispatch={dispatch} />;
};

export const usersInputFormFactory: InputFormFactory = (dispatch: React.Dispatch<Action>) => {
    return <UsersInputForm parentDispatch={dispatch} />;
};
