'use client';

import { useEffect, useState } from 'react';

import { withAdvice, withAdviceAsync } from '@/presentation/_system/aspect/aspect.client';
import { Button } from '@/presentation/_system/components/button.decorator.simple';
import { applicationError, resultError } from '@/presentation/_system/error/error.factories';
import { ErrorRedirect } from '@/presentation/_system/error/views/component.error-redirect';
import { isOkEmpty } from '@/presentation/_system/result/result.helpers';
import { send } from '@/presentation/err-test/models/err-type.client';

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

    async function handleClick() {
        await withAdviceAsync(
            () => _(),
            () => setError(true),
        );
        async function _() {
            if (props.err === '22') {
                const result = await send();
                if (!isOkEmpty(result)) {
                    throw resultError({ result, location: logPrefix + 'ErrTestInput.handleClick' });
                }
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
