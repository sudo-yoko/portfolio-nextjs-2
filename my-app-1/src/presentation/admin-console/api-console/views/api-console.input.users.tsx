'use client';

import { SectionField, SectionLabelQueryParameter } from './api-console.input.shared';

export function usersInputFormFactory() {
    return <UsersInputForm />;
}

function UsersInputForm() {
    return (
        <div className="flex-1 space-y-6">
            <div className="space-y-3">
                <SectionLabelQueryParameter />
                <SectionField field="offset" />
                <SectionField field="limit" />
            </div>
        </div>
    );
}
