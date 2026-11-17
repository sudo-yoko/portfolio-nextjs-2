'use client';

import { useRouter } from 'next/navigation';

export function useNavigation() {
    const router = useRouter();

    function navigatePage(url: string) {
        router.push(url);
    }

    return {
        navigatePage,
    };
}
