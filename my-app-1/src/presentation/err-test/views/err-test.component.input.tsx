'use client';

import { useEffect, useState } from 'react';

import { withAdvice, withAdviceAsync } from '@/presentation/_system/aspect/aspect.client';
import { Button } from '@/presentation/_system/components/button.decorator.simple';
import { applicationError } from '@/presentation/_system/error/error.factories';
import { ErrorRedirect } from '@/presentation/_system/error/views/component.error-redirect';

export default function Input(props: { err?: string }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function _() {
            if (props.err === '3') {
                throw applicationError();
            }
            setLoading(false);
        }
        void withAdvice(
            () => _(),
            () => setError(true),
        );
    });
    return (
        <>
            {error && <ErrorRedirect />}
            {!loading && (
                <div>
                    <Button>ボタン１</Button>
                </div>
            )}
        </>
    );
}
