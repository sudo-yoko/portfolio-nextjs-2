'use client';

import { Fade } from '@/presentation/_system/components/fade';
import { AdminConsoleHeader } from '@/presentation/admin-console/_shared/views/admin-console.parts';

export default function Dashboard() {
    return (
        <div>
            <Fade
                open={true}
                onExit={() => {
                    return;
                }}
            >
                <div className="flex justify-center">
                    <div className="w-full max-w-4xl">
                        <div className="flex flex-col gap-5">
                            <AdminConsoleHeader />
                        </div>
                    </div>
                </div>
            </Fade>
        </div>
    );
}
