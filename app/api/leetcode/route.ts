import { NextResponse } from 'next/server';

export const revalidate = 3600; // cache for 1 hour

export async function GET() {
  try {
    const [calRes, statsRes] = await Promise.all([
      fetch('https://alfa-leetcode-api.onrender.com/cuteFlame/calendar', { next: { revalidate: 3600 } }),
      fetch('https://alfa-leetcode-api.onrender.com/cuteFlame/solved',   { next: { revalidate: 3600 } }),
    ]);

    const cal   = await calRes.json();
    const stats = await statsRes.json();

    return NextResponse.json({ calendar: cal, stats });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
