export type WPMedia = {
  id: number;
  source_url: string;
  alt_text?: string;
};

export type WPPage = {
  id: number;
  slug: string;
  title: string;
  content: string; // HTML
};

export type WPSiteInfo = {
  name: string;
  description?: string;
  url?: string;
};

const WP_API = process.env.WP_API_URL || 'https://example.org/wp-json';

async function safeFetch(path: string) {
  const url = `${WP_API.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`WP API error ${res.status}`);
    }
    const json = await res.json();
    return json;
  } catch (err) {
    // bubble up for loader to catch and fallback
    throw err;
  }
}

export async function getFrontPage(): Promise<WPPage | null> {
  try {
    // Assume a REST endpoint /wp/v2/pages?slug=forside (projects vary) — try common endpoints
    const pages = await safeFetch('wp/v2/pages?per_page=1');
    if (Array.isArray(pages) && pages.length) {
      const p = pages[0];
      return {
        id: p.id,
        slug: p.slug,
        title: p.title?.rendered ?? 'Forside',
        content: p.content?.rendered ?? ''
      };
    }
    return null;
  } catch (err) {
    return null;
  }
}

export async function getSiteInfo(): Promise<WPSiteInfo | null> {
  try {
    const data = await safeFetch(''); // root of WP REST returns general site info in some setups; fallback to wp/v2
    if (data && data.name) return { name: data.name, description: data.description, url: data.url };
  } catch (e) {
    // ignore and try alternative
  }

  try {
    const alt = await safeFetch('wp/v2/settings');
    if (alt && alt.title) return { name: alt.title, description: alt.description };
  } catch (e) {
    // final fallback
  }

  return { name: 'SYNCRONET ApS', description: 'Athletos Starter — synkronisering af sportsdata.' };
}

export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  try {
    const pages = await safeFetch(`wp/v2/pages?slug=${encodeURIComponent(slug)}&per_page=1`);
    if (Array.isArray(pages) && pages.length) {
      const p = pages[0];
      return {
        id: p.id,
        slug: p.slug,
        title: p.title?.rendered ?? slug,
        content: p.content?.rendered ?? ''
      };
    }
    return null;
  } catch (err) {
    return null;
  }
}
