import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://hub.transparency.berkmancenter.org',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1.0,
    },
    {
      url: 'https://hub.transparency.berkmancenter.org/policy_index',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://hub.transparency.berkmancenter.org/comparison_tool',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://hub.transparency.berkmancenter.org/projects',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://hub.transparency.berkmancenter.org/about',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: 'https://hub.transparency.berkmancenter.org/illuminating-policies',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: 'https://hub.transparency.berkmancenter.org/about/researchers',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.64,
    },
    {
      url: 'https://hub.transparency.berkmancenter.org/about/understanding-policies',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.64,
    },
    {
      url: 'https://hub.transparency.berkmancenter.org/legal',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.64,
    },
    {
      url: 'https://hub.transparency.berkmancenter.org/legal/privacy',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.64,
    },
    {
      url: 'https://hub.transparency.berkmancenter.org/legal/terms',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.64,
    }
  ];
}