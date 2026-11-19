'use client';

import { useEffect } from 'react';

import { envValidateStringValue } from '@my/env';
import { useNavigation } from '@my/navigation/browser';

export default function Main() {
    const { navigatePage } = useNavigation();

    useEffect(() => {
        async function _() {
            const url = envValidateStringValue(process.env.NEXT_PUBLIC_SYSTEM_ERROR, {
                key: 'NEXT_PUBLIC_SYSTEM_ERROR_DEFAULT',
            });
            navigatePage(url);
        }
        void _();
    });
    return (
        <>
            <div>エラーページに遷移しています・・・</div>
        </>
    );
}
