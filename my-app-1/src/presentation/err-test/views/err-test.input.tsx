'use client';

import { useEffect, useState } from 'react';

import { useWithAdvice } from '@/presentation/_system/aspect/aspect.client.useWithAdvice';
import { Button } from '@/presentation/_system/components/button.decorator.simple';
import { applicationError, resultError } from '@/presentation/_system/error/error.factories';
import { isOkEmpty } from '@/presentation/_system/result/result.helpers';
import {
    sendViaAction,
    sendViaRoute,
    sendViaRouteClientError,
} from '@/presentation/err-test/models/err-test.client';

const logPrefix = 'err-test.component.input.tsx: ';

// NOTE: 関数名がスタックトレースに出るので、一意な関数名前にすると良い
export default function ErrTestInput(props: { err?: string }) {
    const [loading, setLoading] = useState(true);
    const { withAdvice, withAdviceAsync } = useWithAdvice();

    useEffect(() => {
        withAdvice(() => _());
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
        setLoading(true);
        await withAdviceAsync(() => _());
        async function _() {
            if (props.err === '22') {
                const result = await sendViaRoute();
                if (!isOkEmpty(result)) {
                    throw resultError({ result, location: logPrefix + 'ErrTestInput.handle22Click' });
                }
                setLoading(false);
            }
        }
    }

    async function handle23Click() {
        setLoading(true);
        await withAdviceAsync(() => _());
        async function _() {
            if (props.err === '23') {
                const result = await sendViaAction();
                if (!isOkEmpty(result)) {
                    throw resultError({ result, location: logPrefix + 'ErrTestInput.handle23Click' });
                }
                setLoading(false);
            }
        }
    }

    async function handle24Click() {
        setLoading(true);
        await withAdviceAsync(() => _());
        async function _() {
            if (props.err === '24') {
                const result = await sendViaRouteClientError();
                if (!isOkEmpty(result)) {
                    throw resultError({ result, location: logPrefix + 'ErrTestInput.handle24Click' });
                }
                setLoading(false);
            }
        }
    }

    return (
        <>
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
