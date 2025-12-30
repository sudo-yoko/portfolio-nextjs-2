//
// クライアントサイド エラーハンドリングコンポーネント
//
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function ErrorRedirect() {
    // const redirected = useRef(false); // 再レンダリングなしで保持したい値を参照するためのフック
    const router = useRouter();

    useEffect(() => {
        // devモードでは、StrictModeでuseEffectが２回実行されるためページ遷移が上手くいかないのでuseRefフラグで制御する
        // if (redirected.current) return;
        // redirected.current = true;

        // NOTE: router.replaceのページ遷移だと、開発(Strict Mode)で2回連続実行されるとナビゲーション競合／キャンセルが起こって上手く遷移しない。
        // router.replace('/system-error');
        window.location.replace('/system-error');
    }, [router]);
    return null;
}
