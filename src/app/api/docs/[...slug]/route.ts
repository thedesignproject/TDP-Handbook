import { source, getLLMText } from '@/lib/source';
import { NextResponse } from 'next/server';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await params;

  // Remove .mdx extension if present
  const cleanSlug = slug.map((s, i) =>
    i === slug.length - 1 ? s.replace(/\.mdx$/, '') : s,
  );

  // Handle "index" as root page (empty slug array)
  const pageSlug =
    cleanSlug.length === 1 && cleanSlug[0] === 'index' ? [] : cleanSlug;

  const page = source.getPage(pageSlug);

  if (!page) {
    return NextResponse.json({ error: 'Page not found' }, { status: 404 });
  }

  const text = await getLLMText(page);

  return new NextResponse(text, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
