import 'server-only';

const logPrefix = 'client.route.ts: ';

export async function GET() {
    console.log('############', logPrefix, 'start');
    return new Response(null, { status: 200 });
}
