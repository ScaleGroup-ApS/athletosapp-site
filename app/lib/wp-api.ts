import type { WpPage, WpPost, WpSiteInfo } from "./wp-types";

// Re-export types for any consumers that import from here
export type { WpPage, WpPost, WpSiteInfo };

/** @deprecated Use WpPage from ~/lib/wp-types */
export type WPPage = WpPage;
/** @deprecated Use WpSiteInfo from ~/lib/wp-types */
export type WPSiteInfo = WpSiteInfo;

export type WPMedia = {
  id: number;
  source_url: string;
  alt_text?: string;
};

const WP_API = process.env.WP_API_URL || 'https://example.org/wp-json';

async function safeFetch(path: string) {
  const url = `${WP_API.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`WP API error ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    throw err;
  }
}

export async function getFrontPage(): Promise<WpPage | null> {
  try {
    const pages = await safeFetch('wp/v2/pages?per_page=1&_embed=1');
    if (Array.isArray(pages) && pages.length) {
      return pages[0] as WpPage;
    }
    return null;
  } catch {
    return null;
  }
}

export async function getSiteInfo(): Promise<WpSiteInfo | null> {
  try {
    const d = await safeFetch('');
    if (d && d.name) {
      return {
        name: d.name,
        description: d.description ?? '',
        url: d.url ?? '',
        home: d.home ?? d.url ?? '',
        gmt_offset: d.gmt_offset ?? 0,
        timezone_string: d.timezone_string ?? '',
      } satisfies WpSiteInfo;
    }
  } catch {
    // try alternative
  }

  try {
    const alt = await safeFetch('wp/v2/settings');
    if (alt && alt.title) {
      return {
        name: alt.title,
        description: alt.description ?? '',
        url: alt.url ?? '',
        home: alt.url ?? '',
        gmt_offset: 0,
        timezone_string: '',
      } satisfies WpSiteInfo;
    }
  } catch {
    // final fallback
  }

  return {
    name: 'SYNCRONET ApS',
    description: 'Athletos Starter — synkronisering af sportsdata.',
    url: '',
    home: '',
    gmt_offset: 0,
    timezone_string: '',
  };
}

export async function getPageBySlug(slug: string): Promise<WpPage | null> {
  try {
    const pages = await safeFetch(
      `wp/v2/pages?slug=${encodeURIComponent(slug)}&per_page=1&_embed=1`
    );
    if (Array.isArray(pages) && pages.length) {
      return pages[0] as WpPage;
    }
    return null;
  } catch {
    return null;
  }
}

export async function getPages(params?: { per_page?: number }): Promise<WpPage[]> {
  try {
    const perPage = params?.per_page ?? 100;
    const pages = await safeFetch(`wp/v2/pages?per_page=${perPage}&status=publish&_embed=1`);
    if (Array.isArray(pages)) {
      return pages as WpPage[];
    }
    return [];
  } catch {
    return [];
  }
}

export async function getPosts(params?: { per_page?: number }): Promise<WpPost[]> {
  try {
    const perPage = params?.per_page ?? 100;
    const posts = await safeFetch(`wp/v2/posts?per_page=${perPage}&status=publish&_embed=1`);
    if (Array.isArray(posts)) {
      return posts as WpPost[];
    }
    return [];
  } catch {
    return [];
  }
}
