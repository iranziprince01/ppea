export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "Probity Partners East Africa",
    "alternateName": "PPEA",
    "description": "Leading law firm in East Africa providing expert legal services across multiple practice areas.",
    "url": "https://probitypartnersea.com",
    "logo": "https://probitypartnersea.com/assets/logo4.png",
    "image": "https://probitypartnersea.com/assets/logo4.png",
    "telephone": ["+250791676618", "+250788561313"],
    "email": "probitypartnersea1@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "KG 17 Ave",
      "addressLocality": "Kigali",
      "addressCountry": "RW",
      "addressRegion": "Kigali"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -1.9441,
      "longitude": 30.0615
    },
    "openingHours": "Mo-Fr 08:00-18:00",
    "priceRange": "$$",
    "currenciesAccepted": "USD, EUR, RWF",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer",
    "areaServed": [
      {
        "@type": "Country",
        "name": "Rwanda"
      },
      {
        "@type": "Country",
        "name": "Kenya"
      },
      {
        "@type": "Country",
        "name": "Uganda"
      },
      {
        "@type": "Country",
        "name": "Tanzania"
      }
    ],
    "serviceType": [
      "Corporate Law",
      "Banking and Finance",
      "Litigation",
      "Real Estate",
      "Employment Law",
      "Tax Law",
      "Intellectual Property",
      "Human Rights Law",
      "Criminal Law",
      "Family Law"
    ],
    "foundingDate": "2011",
    "numberOfEmployees": "15+",
    "award": [
      "Leading Law Firm in East Africa",
      "Excellence in Legal Services"
    ],
    "sameAs": [
      "https://www.linkedin.com/company/probity-partners-of-east-africa/about/",
      "https://twitter.com/ProbityPEA"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
