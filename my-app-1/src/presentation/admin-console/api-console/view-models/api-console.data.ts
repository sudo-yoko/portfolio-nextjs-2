'use client';

import { Item } from '@/presentation/admin-console/api-console/models/api-console.types';
import {
    createCustomersIndividualForm,
    createDummyIndividualForm,
    createUsersIndividualForm,
} from '@/presentation/admin-console/api-console/view-models/api-console.input.factories';
import { Action, State } from '@/presentation/admin-console/api-console/view-models/api-console.reducer';
import React from 'react';

const _empty: Item[] = [];

const _item1: Item[] = [
    {
        id: '1',
        method: 'GET',
        path: '/customers/{customerId}',
        description: '顧客情報取得API',
        individualFormFactory: (state: State, dispatch: React.Dispatch<Action>) =>
            createCustomersIndividualForm(state, dispatch),
    },
];

const items: Item[] = [
    {
        id: '1',
        method: 'GET',
        path: '/customers/{customerId}',
        description: '顧客情報取得API',
        individualFormFactory: (state: State, dispatch: React.Dispatch<Action>) =>
            createCustomersIndividualForm(state, dispatch),
    },
    {
        id: '2',
        method: 'GET',
        path: '/users',
        description: 'ユーザー一覧取得API',
        individualFormFactory: (state: State, dispatch: React.Dispatch<Action>) =>
            createUsersIndividualForm(state, dispatch),
    },
    {
        id: '3',
        method: 'POST',
        path: '/customers/{customerId}',
        description: '顧客情報取得API',
        individualFormFactory: (state: State, dispatch: React.Dispatch<Action>) =>
            createDummyIndividualForm(state, dispatch),
    },
    {
        id: '4',
        method: 'DELETE',
        path: '/customers/{customerId}',
        description: '顧客情報取得API',
        individualFormFactory: (state: State, dispatch: React.Dispatch<Action>) =>
            createDummyIndividualForm(state, dispatch),
    },
    {
        id: '5',
        method: 'PUT',
        path: '/customers/{customerId}',
        description: '顧客情報取得API',
        individualFormFactory: (state: State, dispatch: React.Dispatch<Action>) =>
            createDummyIndividualForm(state, dispatch),
    },
];

export const apiList: Item[] = items;
