'use client';

import {
    SectionField,
    SectionLabelQueryParameter,
} from '@/presentation/admin-console/api-console/_individual/_shared/views/api-console.input.parts';
import { Action as ParentAction } from '../../../view-models/api-console.reducer';

export function UsersInputForm({ parentDispatch }: { parentDispatch: React.Dispatch<ParentAction> }) {
    return (
        <div className="flex-1 space-y-6">
            <div className="space-y-3">
                <SectionLabelQueryParameter />
                <SectionField
                    value={'1'}
                    onChange={() => {
                        return;
                    }}
                    field="offset"
                />
                <SectionField
                    value={'100'}
                    onChange={() => {
                        return;
                    }}
                    field="limit"
                />
            </div>
        </div>
    );
}
