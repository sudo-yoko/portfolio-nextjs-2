'use client';

import { Item } from '@/presentation/admin-console/api-console/models/api-console.types';
import { CustomersIndividualForm } from '../_individual/customers/views/api-console.input.customers';
import { UsersIndividualForm } from '../_individual/users/views/api-console.input.users';
import { DummyIndividualForm } from '../_individual/_shared/views/api-console.input.dummy';

const _empty: Item[] = [];

const _item1: Item[] = [
    {
        id: '1',
        method: 'GET',
        path: '/customers/{customerId}',
        description: '顧客情報取得API',
        individualForm: CustomersIndividualForm,
    },
];

const items: Item[] = [
    {
        id: '1',
        method: 'GET',
        path: '/customers/{customerId}',
        description: '顧客情報取得API',
        individualForm: CustomersIndividualForm,
    },
    {
        id: '2',
        method: 'GET',
        path: '/users',
        description: 'ユーザー一覧取得API',
        individualForm: UsersIndividualForm,
    },
    {
        id: '3',
        method: 'POST',
        path: '/customers/{customerId}',
        description: '顧客情報取得API',
        individualForm: DummyIndividualForm,
    },
    {
        id: '4',
        method: 'DELETE',
        path: '/customers/{customerId}',
        description: '顧客情報取得API',
        individualForm: DummyIndividualForm,
    },
    {
        id: '5',
        method: 'PUT',
        path: '/customers/{customerId}',
        description: '顧客情報取得API',
        individualForm: DummyIndividualForm,
    },
];

export const apiList: Item[] = items;
