//
// クライアントサイド エラーハンドリングコンポーネント
//
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export function ErrorRedirect() {
  const redirected = useRef(false); // 再レンダリングなしで保持したい値を参照するためのフック
  const router = useRouter();

  useEffect(() => {
    // devモードでは、StrictModeでuseEffectが２回実行されるためページ遷移が上手くいかないのでuseRefフラグで制御する
    if (redirected.current) return;
    redirected.current = true;

    router.replace('/system-error');
  }, [router]);
  return null;
}
