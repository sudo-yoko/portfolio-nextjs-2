import 'server-only';

export default function AdminConsoleLayout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            <div className="min-h-screen bg-linear-to-r from-indigo-950 to-indigo-900 p-5">{children}</div>
        </section>
    );
}
