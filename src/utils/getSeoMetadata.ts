import { SEO } from '../config';

export default function getSeoMetadata(
  title = SEO.title,
  description = SEO.description,
  keywords = SEO.keywords
) {
  return {
    title: SEO.titleTemplate.replace('{title}', title),
    description,
    keywords,
  };
}
