import { Helmet } from "react-helmet-async";

interface SeoHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
}

const SITE = "Soni Consultancy Services";
const DEFAULT_OG = "https://soniconsultancyservices.com/og-image.jpg";
const BASE = "https://soniconsultancyservices.com";

export function SeoHead({
  title,
  description,
  canonical,
  ogImage,
  ogType = "website",
  noIndex = false,
  publishedTime,
  modifiedTime,
  author,
  tags,
}: SeoHeadProps) {
  const fullTitle = `${title} | ${SITE}`;
  const fullCanonical = canonical ? (canonical.startsWith("http") ? canonical : `${BASE}${canonical}`) : BASE;
  const image = ogImage || DEFAULT_OG;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:site_name" content={SITE} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@CodeMak_" />
      <meta name="twitter:creator" content="@CodeMak_" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={fullTitle} />
      <meta name="author" content={author || SITE} />
      <meta name="geo.region" content="IN-GJ" />
      <meta name="geo.placename" content="Ahmedabad, Gujarat, India" />
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {tags?.map((t) => <meta property="article:tag" content={t} key={t} />)}
    </Helmet>
  );
}
