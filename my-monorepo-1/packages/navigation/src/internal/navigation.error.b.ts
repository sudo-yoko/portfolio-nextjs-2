'use client';

import { useRouter } from 'next/navigation';

export function navigationError() {
    const router = useRouter();
    router.push('/system-error');
}
