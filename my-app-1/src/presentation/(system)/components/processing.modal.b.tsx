'use client';

export function ProcessingModalB() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/30 transition-opacity" />
            <div className="flex animate-pulse">
                <div className="size-20 animate-spin rounded-full border-10 border-dashed border-gray-300"></div>
            </div>
        </div>
    );
}
