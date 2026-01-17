'use client';

import {
    SectionField,
    SectionLabelPathParameter,
} from '@/presentation/admin-console/api-console/_individual/_shared/views/api-console.input.shared';

export function CustomersInputForm() {
    return (
        <div className="flex-1 space-y-6">
            <div className="space-y-3">
                <SectionLabelPathParameter />
                <SectionField field="customerId" />
            </div>
        </div>
    );
}
