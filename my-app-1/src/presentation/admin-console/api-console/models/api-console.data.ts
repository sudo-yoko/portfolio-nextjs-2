import { Item } from '@/presentation/admin-console/api-console/models/api-console.types';

export const apiList: Item[] = [
    {
        id: '1',
        method: 'GET',
        path: '/customers/{customerId}',
        description: '顧客情報取得API',
    },
    {
        id: '2',
        method: 'POST',
        path: '/customers/{customerId}',
        description: '顧客情報取得API',
    },
    {
        id: '3',
        method: 'DELETE',
        path: '/customers/{customerId}',
        description: '顧客情報取得API',
    },
    {
        id: '4',
        method: 'PUT',
        path: '/customers/{customerId}',
        description: '顧客情報取得API',
    },
        {
        id: '5',
        method: 'PUT',
        path: '/customers/{customerId}',
        description: '顧客情報取得API',
    },
];
