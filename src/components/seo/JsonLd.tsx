type Props = {
  data: Record<string, unknown>;
};

/**
 * Structured data for search engines and AI assistants. The data comes only from this
 * site's own src/lib files, and "<" is escaped so no value can close the script tag.
 */
export function JsonLd({ data }: Props) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
