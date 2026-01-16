'use client';

import { SectionField, SectionLabelPathParameter } from './api-console.input.shared';

export function renderCustomersPanel() {
    return <CustomersPanel />;
}

function CustomersPanel() {
    return (
        <div className="flex-1 space-y-6">
            <div className="space-y-3">
                <SectionLabelPathParameter />
                <SectionField field="customerId" />
            </div>
        </div>
    );
}
