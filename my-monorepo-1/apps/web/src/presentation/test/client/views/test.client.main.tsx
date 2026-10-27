'use client';

import { useEffect } from 'react';

import { send } from '@/presentation/test/client/bff/test.client.client';

export default function Main() {
    useEffect(() => {
        async function _() {
            await send();
        }
        void _();
    });
    return (
        <>
            <div>client test</div>
        </>
    );
}
