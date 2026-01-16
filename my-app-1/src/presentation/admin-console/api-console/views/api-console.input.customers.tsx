'use client';

import { SectionField, SectionLabelPathParameter } from './api-console.input.shared';

export function customersInputFormFactory() {
    return <CustomersInputForm />;
}

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
