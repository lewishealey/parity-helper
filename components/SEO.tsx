import { Metadata } from 'next';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

export function generateMetadata({
  title,
  description = 'A tool to help with Parity calculations and simulations',
  image = '/og-image.png',
  url = 'https://parity.lewishealey.com',
  type = 'website',
}: SEOProps): Metadata {
  return {
    title,
    description,
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
      shortcut: '/favicon.ico',
    },
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
      url,
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default function SEO(props: SEOProps) {
  // This is a client component that doesn't render anything
  // It's just a wrapper for the metadata function
  return null;
}