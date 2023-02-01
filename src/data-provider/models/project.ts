import { z } from 'zod';

export enum SocialNetwork {
  FACEBOOK = 'facebook',
  TWITTER = 'twitter',
  REDDIT = 'reddit',
  LINKEDIN = 'linkedin',
  INSTAGRAM = 'instagram',
  MEDIUM = 'medium',
  MIRROR = 'mirror',
  YOUTUBE = 'youtube',
  TELEGRAM = 'telegram',
}

export enum Chain {
  ETH = 'ethereum',
  MATIC = 'polygon',
  AVAX = 'avalanche',
  BSC = 'binance',
}

export const ProjectModel = z.object({
  slug: z.string(),
  name: z.string(),
  type: z.enum(['community', 'organization', 'product']),
  status: z.enum(['active', 'inactive', 'development']),
  tagline: z.string(),
  description: z.string().nullish(),
  url: z.string().url(),
  image: z.string().nullish(),
  topics: z.array(z.string()).default([]),
  chain: z.nativeEnum(Chain).nullish(),
  socialNetworks: z.record(z.nativeEnum(SocialNetwork), z.string()).default({}),
  createdAt: z.coerce.date().transform((v) => v.toISOString()),
});

export type Project = z.infer<typeof ProjectModel>;
