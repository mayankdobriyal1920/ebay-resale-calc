import { SITE_URL } from "@/lib/site";

export default function StructuredData() {
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Reseller Profit Calc",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/`,
      "query-input": "required",
    },
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Reseller Profit Calc",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
    </>
  );
}