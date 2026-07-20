'use client';

import { useEffect, useState } from 'react';

import { withAdvice, withAdviceAsync } from '@/presentation/_system/aspect/aspect.client';
import { Button } from '@/presentation/_system/components/button.decorator.simple';
import { applicationError, resultError } from '@/presentation/_system/error/error.factories';
import { ErrorRedirect } from '@/presentation/_system/error/views/component.error-redirect';
import { isOkEmpty } from '@/presentation/_system/result/result.helpers';
import {
    sendViaAction,
    sendViaRoute,
    sendViaRouteClientError,
} from '@/presentation/err-test/models/err-type.client';

const logPrefix = 'err-test.component.input.tsx: ';

// NOTE: 関数名がスタックトレースに出るので、一意な関数名前にすると良い
export default function ErrTestInput(props: { err?: string }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        withAdvice(
            () => _(),
            () => setError(true),
        );
        function _() {
            if (props.err === '21') {
                throw applicationError({
                    message: props.err,
                    location: logPrefix + 'ErrTestInput.useEffect',
                });
            }
            setLoading(false);
        }
    }, [props.err]);

    async function handleClick1() {
        await withAdviceAsync(
            () => _(),
            () => setError(true),
        );
        async function _() {
            if (props.err === '22') {
                const result = await sendViaRoute();
                if (!isOkEmpty(result)) {
                    throw resultError({ result, location: logPrefix + 'ErrTestInput.handleClick1' });
                }
            }
        }
    }

    async function handleClick2() {
        await withAdviceAsync(
            () => _(),
            () => setError(true),
        );
        async function _() {
            if (props.err === '23') {
                const result = await sendViaAction();
                if (!isOkEmpty(result)) {
                    throw resultError({ result, location: logPrefix + 'ErrTestInput.handleClick2' });
                }
            }
        }
    }

    async function handleClick24() {
        await withAdviceAsync(
            () => _(),
            () => setError(true),
        );
        async function _() {
            if (props.err === '24') {
                const result = await sendViaRouteClientError();
                if (!isOkEmpty(result)) {
                    throw resultError({ result, location: logPrefix + 'ErrTestInput.handleClick2' });
                }
            }
        }
    }

    return (
        <>
            {error && <ErrorRedirect />}
            {!loading && (
                <div>
                    <Button onClick={() => handleClick1()}>22</Button>
                    <Button onClick={() => handleClick2()}>23</Button>
                    <Button onClick={() => handleClick24()}>24</Button>
                </div>
            )}
        </>
    );
}
