export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bayardvacations.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/account/',
        '/login',
        '/email-verification',
        '/checkout',
        '/api/',
        '/_next/',
        '/static/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
