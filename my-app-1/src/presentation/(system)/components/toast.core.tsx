'use client';

export function Toast({ message }: { message: string[] }) {
    return (
        <div className="center-4 center-4 fixed rounded bg-red-500 px-4 py-2 text-white shadow-lg transition-opacity duration-300">
            {message.map((msg, index) => (
                <div key={index}>{msg}</div>
            ))}
        </div>
    );
}
