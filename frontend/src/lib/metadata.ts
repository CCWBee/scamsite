import { Metadata } from 'next';

// Base metadata configuration
const siteConfig = {
  name: 'ScamAware Jersey',
  description: 'Helping Jersey residents identify and protect against scams',
  url: 'https://scamaware.je', // placeholder
  locale: 'en_GB',
  siteName: 'ScamAware Jersey',
};

// Default OG image
const defaultOgImage = {
  url: '/og-default.png',
  width: 1200,
  height: 630,
  alt: 'ScamAware Jersey - Protecting Jersey from scams',
};

// Generate metadata for a page
export function generatePageMetadata({
  title,
  description,
  path = '',
  ogImage,
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  ogImage?: { url: string; alt: string };
  noIndex?: boolean;
}): Metadata {
  const url = `${siteConfig.url}${path}`;

  return {
    title: `${title} | ${siteConfig.name}`,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.siteName,
      locale: siteConfig.locale,
      type: 'website',
      images: [ogImage || defaultOgImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage?.url || defaultOgImage.url],
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}

// Generate metadata for scam type pages
export function generateScamMetadata(scam: {
  title: string;
  description: string;
  slug: string;
}): Metadata {
  return generatePageMetadata({
    title: scam.title,
    description: `Learn about ${scam.title.toLowerCase()} and how to protect yourself. ${scam.description}`,
    path: `/scams/${scam.slug}`,
  });
}
