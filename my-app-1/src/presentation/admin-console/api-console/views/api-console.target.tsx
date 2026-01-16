'use client';

import { Button } from '@/presentation/(system)/components/button.decorator.simple';
import { State } from '../view-models/api-console.reducer';

export default function TargetApi({ state, className }: { state: State; className: string }) {
    return (
        <div className={className}>
            <div>選択されたAPI</div>
            {!state.selectedItem && <div>選択されていません。</div>}
            {state.selectedItem && (
                <div>
                    <div>{state.selectedItem.description}</div>
                    <div>
                        {state.selectedItem.method} {state.selectedItem.path}
                    </div>
                    <InputPanel state={state} />
                    <Button>実行する</Button>
                    <Button>選択解除</Button>
                </div>
            )}
        </div>
    );
}

function InputPanel({ state }: { state: State }) {
    return state.selectedItem?.inputPanel?.(state) || null;
}

export function customersApiPanel({ state }: { state: State }) {
    return (
        <div>customerId</div>
    )
}
