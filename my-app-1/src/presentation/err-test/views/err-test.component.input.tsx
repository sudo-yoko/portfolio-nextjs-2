'use client';

import { useEffect, useState } from 'react';

import { withAdvice } from '@/presentation/_system/aspect/aspect.client';
import { Button } from '@/presentation/_system/components/button.decorator.simple';
import { applicationError } from '@/presentation/_system/error/error.factories';
import { ErrorRedirect } from '@/presentation/_system/error/views/component.error-redirect';

export default function Input(props: { err?: string }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        withAdvice(
            () => _(),
            () => setError(true),
        );
        function _() {
            if (props.err === '3') {
                throw applicationError({ message: props.err });
            }
            setLoading(false);
        }
    });

    function handleClick() {
        withAdvice(
            () => _(),
            () => setError(true),
        );
        function _() {
            if (props.err === '4') {
                throw applicationError({ message: props.err });
            }
        }
    }

    return (
        <>
            {error && <ErrorRedirect />}
            {!loading && (
                <div>
                    <Button onClick={() => handleClick()}>ボタン１</Button>
                    <Button onClick={() => {}}>ボタン２</Button>
                    <Button onClick={() => {}}>ボタン３</Button>
                </div>
            )}
        </>
    );
}
