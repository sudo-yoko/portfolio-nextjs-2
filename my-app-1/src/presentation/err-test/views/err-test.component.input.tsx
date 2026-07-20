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

    async function handle22Click() {
        await withAdviceAsync(
            () => _(),
            () => setError(true),
        );
        async function _() {
            if (props.err === '22') {
                const result = await sendViaRoute();
                if (!isOkEmpty(result)) {
                    throw resultError({ result, location: logPrefix + 'ErrTestInput.handle22Click' });
                }
            }
        }
    }

    async function handle23Click() {
        await withAdviceAsync(
            () => _(),
            () => setError(true),
        );
        async function _() {
            if (props.err === '23') {
                const result = await sendViaAction();
                if (!isOkEmpty(result)) {
                    throw resultError({ result, location: logPrefix + 'ErrTestInput.handle23Click' });
                }
            }
        }
    }

    async function handle24Click() {
        await withAdviceAsync(
            () => _(),
            () => setError(true),
        );
        async function _() {
            if (props.err === '24') {
                const result = await sendViaRouteClientError();
                if (!isOkEmpty(result)) {
                    throw resultError({ result, location: logPrefix + 'ErrTestInput.handle24Click' });
                }
            }
        }
    }

    return (
        <>
            {error && <ErrorRedirect />}
            {!loading && (
                <div>
                    <Button onClick={() => handle22Click()}>22</Button>
                    <Button onClick={() => handle23Click()}>23</Button>
                    <Button onClick={() => handle24Click()}>24</Button>
                </div>
            )}
        </>
    );
}
