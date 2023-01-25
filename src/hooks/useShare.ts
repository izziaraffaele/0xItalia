import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';

export type Sharable = {
  title?: string;
  description?: string;
  url?: string;
};

export type UseShareContentProps = {
  content: Sharable;
  fallback?: (content: Sharable) => unknown;
};

export function useShareContent({
  content,
  fallback = () => {},
}: UseShareContentProps) {
  const router = useRouter();

  const share = useCallback(
    (input?: Sharable) => {
      const canonical = document.querySelector<any>('link[rel=canonical]');
      const shareUrl = canonical ? canonical.href : document.location.href;

      const shareDetails = {
        title: '',
        description: '',
        url: shareUrl,
        ...(input || content),
      };

      if (navigator.share) {
        navigator.share(shareDetails).catch((error) => {
          console.log(`Oops! I couldn't share to the world because: ${error}`);
        });
      } else {
        fallback(shareDetails);
      }
    },
    [content]
  );

  return { share };
}
