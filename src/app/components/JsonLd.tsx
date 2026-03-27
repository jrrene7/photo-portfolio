export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://renevision.net/#jean-robert",
        name: "Jean-Robert",
        url: "https://renevision.net",
        jobTitle: "Photographer",
        description:
          "NYC-based portrait, editorial, brand, and event photographer shooting worldwide.",
        image: "https://renevision.net/my-portrait.png",
        sameAs: [
          "https://www.instagram.com/rene.vision",
        ],
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://renevision.net/#business",
        name: "René Vision",
        url: "https://renevision.net",
        image: "https://renevision.net/my-portrait.png",
        description:
          "NYC-based portrait, editorial, brand, and event photographer. Sharp visuals, intentional direction, and a process built around you.",
        founder: { "@id": "https://renevision.net/#jean-robert" },
        address: {
          "@type": "PostalAddress",
          addressLocality: "New York",
          addressRegion: "NY",
          addressCountry: "US",
        },
        areaServed: [
          { "@type": "City", name: "New York City" },
          { "@type": "Country", name: "Worldwide" },
        ],
        serviceType: [
          "Portrait Photography",
          "Editorial Photography",
          "Brand Photography",
          "Event Photography",
          "Headshot Photography",
          "Couples Photography",
          "Travel Photography",
          "Videography",
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}