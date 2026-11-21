export default function StructuredData() {
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Reseller Profit Calc",
    url: "https://flipfee.online",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://flipfee.online/",
      "query-input": "required",
    },
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Reseller Profit Calc",
    url: "https://flipfee.online",
    logo: "https://flipfee.online/logo.png",
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