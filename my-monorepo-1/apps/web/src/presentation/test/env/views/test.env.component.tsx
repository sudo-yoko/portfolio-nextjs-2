'use client';

import { useEffect, useState } from 'react';

import { envByStaticKey } from '@my/env';

export default function Component() {
    const [env1, setEnv1] = useState('');
    const [env2, setEnv2] = useState('');
    useEffect(() => {
        void _();
        async function _() {
            const e1 = envByStaticKey.NODE_ENV;
            setEnv1(e1);
            const e2 = envByStaticKey.NEXT_PUBLIC_DEBUG_LOGGER;
            setEnv2(e2 ?? 'undefined');
        }
    });
    return (
        <>
            <div>envByStaticKey.NODE_ENV: {env1}</div>
            <div>envByStaticKey.NEXT_PUBLIC_DEBUG_LOGGER: {env2}</div>
        </>
    );
}
