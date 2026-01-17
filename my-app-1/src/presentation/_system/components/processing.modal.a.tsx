'use client';

export function ProcessingModalA({ children }: { children: React.ReactNode }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 transition-opacity" />
            <div className="transition-align-baseline relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl">
                <div className="flex animate-pulse flex-row items-center justify-center gap-2">
                    <div className="size-6 animate-spin rounded-full border-4 border-dashed border-gray-300"></div>
                    <div>{children}</div>
                </div>
            </div>
        </div>
    );
}
