import React from 'react';
import { Header } from '~/components/Header';
import { Footer } from '~/components/Footer';
import { Section } from '~/components/Section';
import { getPageBySlug, getSiteInfo } from '~/lib/wp-api';

export async function loader({ params }: any) {
  const slug = params.slug;
  if (!slug) throw new Response('Not Found', { status: 404 });

  try {
    const page = await getPageBySlug(slug);
    const siteInfo = await getSiteInfo();

    if (!page) {
      throw new Response('Not Found', { status: 404 });
    }

    return { page, siteInfo };
  } catch (err) {
    throw new Response('Not Found', { status: 404 });
  }
}

export default function PageRoute({ data }: any) {
  // Note: in framework-mode the loader's data would be provided via hooks — for clarity we assume server-rendered props
  // Render page content with Header/Footer for consistent layout

  const siteName = data?.siteInfo?.name ?? 'SYNCRONET ApS';
  const menu = [
    { title: 'Om os', url: '/om-os' },
    { title: 'Ydelser', url: '/ydelser' },
    { title: 'Kontakt', url: '/kontakt' }
  ];

  const page = data?.page ?? { title: 'Side', content: '<p>Indhold ikke fundet.</p>' };

  return (
    <div className="min-h-screen flex flex-col">
      <Header siteName={siteName} menuItems={menu} />

      <main className="flex-1">
        <Section className="pt-16 pb-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">{page.title}</h1>
            <div className="prose prose-invert text-muted" dangerouslySetInnerHTML={{ __html: page.content }} />
          </div>
        </Section>
      </main>

      <Footer siteName={siteName} siteDescription={data?.siteInfo?.description ?? undefined} />
    </div>
  );
}
