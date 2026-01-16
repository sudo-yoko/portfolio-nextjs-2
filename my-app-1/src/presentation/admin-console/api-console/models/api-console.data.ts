import { Item } from '@/presentation/admin-console/api-console/models/api-console.types';
import { customersInputFormFactory } from '../views/api-console.input.customers';
import { usersInputFormFactory } from '../views/api-console.input.users';

const _empty: Item[] = [];


const _item1: Item[] = [
    {
        id: '1',
        method: 'GET',
        path: '/customers/{customerId}',
        description: '顧客情報取得API',
        inputFormFactory: () => customersInputFormFactory(),
    },
]

const items: Item[] = [
    {
        id: '1',
        method: 'GET',
        path: '/customers/{customerId}',
        description: '顧客情報取得API',
        inputFormFactory: () => customersInputFormFactory(),
    },
    {
        id: '2',
        method: 'GET',
        path: '/users',
        description: 'ユーザー一覧取得API',
        inputFormFactory: () => usersInputFormFactory(),
    },
    {
        id: '3',
        method: 'DELETE',
        path: '/customers/{customerId}',
        description: '顧客情報取得API',
        inputFormFactory: () => customersInputFormFactory(),
    },
    {
        id: '4',
        method: 'POST',
        path: '/customers/{customerId}',
        description: '顧客情報取得API',
        inputFormFactory: () => customersInputFormFactory(),
    },
    {
        id: '5',
        method: 'PUT',
        path: '/customers/{customerId}',
        description: '顧客情報取得API',
        inputFormFactory: () => customersInputFormFactory(),
    },
];

export const apiList: Item[] = items;
