'use client';

import {
    SectionField,
    SectionLabelPathParameter,
} from '@/presentation/admin-console/api-console/_individual/_shared/views/api-console.input.shared';
import { InputFormFactory } from '@/presentation/admin-console/api-console/models/api-console.types';

export const customersInputFormFactory: InputFormFactory = () => {
    return <CustomersInputForm />;
};

function CustomersInputForm() {
    return (
        <div className="flex-1 space-y-6">
            <div className="space-y-3">
                <SectionLabelPathParameter />
                <SectionField field="customerId" />
            </div>
        </div>
    );
}
