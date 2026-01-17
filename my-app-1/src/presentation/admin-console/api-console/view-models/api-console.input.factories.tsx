'use client';

import { CustomersInputForm } from '@/presentation/admin-console/api-console/_individual/customers/views/api-console.input.customers';
import { UsersInputForm } from '@/presentation/admin-console/api-console/_individual/users/views/api-console.input.users';
import { InputFormFactory } from '@/presentation/admin-console/api-console/models/api-console.types';

export const customersInputFormFactory: InputFormFactory = () => {
    return <CustomersInputForm />;
};

export const usersInputFormFactory: InputFormFactory = () => {
    return <UsersInputForm />;
};
