import { plans, priceFor } from '@/lib/plans';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site';

/** schema.org JSON-LD: the company, the site, and the product with its paid plans. */
export default function StructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/apple-icon`,
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: 'vi-VN',
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'SoftwareApplication',
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        inLanguage: 'vi-VN',
        publisher: { '@id': `${SITE_URL}/#organization` },
        offers: plans.flatMap((p) => {
          const price = priceFor(p, 'month');
          return price === null
            ? []
            : [
                {
                  '@type': 'Offer',
                  name: `Gói ${p.name}`,
                  price,
                  priceCurrency: 'VND',
                  url: `${SITE_URL}/#bang-gia`,
                  priceSpecification: {
                    '@type': 'UnitPriceSpecification',
                    price,
                    priceCurrency: 'VND',
                    billingDuration: 'P1M',
                  },
                },
              ];
        }),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here: all values are our own constants.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
