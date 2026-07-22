// カスタムフック化　未使用
// import 'client-only';    // TODO: tsモジュールでのclient-onlyとuse clientの違い
'use client';

import { useEffect, useState } from 'react';

import { withAdvice, withAdviceAsync } from '@/presentation/_system/aspect/aspect.client';
import { applicationError, resultError } from '@/presentation/_system/error/error.factories';
import { isOkEmpty } from '@/presentation/_system/result/result.helpers';
import {
    sendViaAction,
    sendViaRoute,
    sendViaRouteClientError,
} from '@/presentation/err-test/models/err-test.client';

const logPrefix = 'useErrTest.ts: ';

export function useErrTest(props: { err?: string }) {
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
                    location: logPrefix + 'useErrTest.useEffect',
                });
            }
            setLoading(false);
        }
    }, [props.err]);

    const handle22Click = async () => {
        await withAdviceAsync(
            () => _(),
            () => setError(true),
        );
        async function _() {
            if (props.err === '22') {
                const result = await sendViaRoute();
                if (!isOkEmpty(result)) {
                    throw resultError({ result, location: logPrefix + 'useErrTest.handle22Click' });
                }
            }
        }
    };

    const handle23Click = async () => {
        await withAdviceAsync(
            () => _(),
            () => setError(true),
        );
        async function _() {
            if (props.err === '23') {
                const result = await sendViaAction();
                if (!isOkEmpty(result)) {
                    throw resultError({ result, location: logPrefix + 'useErrTest.handle23Click' });
                }
            }
        }
    };

    const handle24Click = async () => {
        await withAdviceAsync(
            () => _(),
            () => setError(true),
        );
        async function _() {
            if (props.err === '24') {
                const result = await sendViaRouteClientError();
                if (!isOkEmpty(result)) {
                    throw resultError({ result, location: logPrefix + 'useErrTest.handle24Click' });
                }
            }
        }
    };

    return { loading, error, handle22Click, handle23Click, handle24Click };
}
