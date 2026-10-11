'use client';

import { useEffect, useState } from 'react';

import { nodeEnvNext } from '@my/env';

export default function Component() {
    const [env1, setEnv1] = useState('');
    const [env2, setEnv2] = useState('');
    // const [env3, setEnv3] = useState('');
    // const [env4, setEnv4] = useState('');
    useEffect(() => {
        void _();
        async function _() {
            const e1 = process.env.NODE_ENV;
            setEnv1(e1);
            const e2 = nodeEnvNext();
            setEnv2(e2);
            // const e3 = envByStaticKey.NEXT_PUBLIC_DEBUG_LOGGER;
            // setEnv3(e3 ?? 'undefined');
            // const e4 = envNodeEnvNext();
            // setEnv4(e4);
        }
    });
    return (
        <>
            <div>process.env.NODE_ENV: {env1}</div>
            <div>envByStaticKey.NODE_ENV: {env2}</div>
            {/* <div>envByStaticKey.NEXT_PUBLIC_DEBUG_LOGGER: {env3}</div>
            <div>envNodeEnvNext() {env4}</div> */}
        </>
    );
}
