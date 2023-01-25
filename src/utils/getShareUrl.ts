export type TargetData = {
  facebook: { u: string };
  whatsapp: { text: string };
  telegram: { url: string; text: string };
  twitter: {
    text: string;
    in_reply_to?: string;
    url: string;
    hashtags?: string;
    via?: string;
    related?: string;
  };
  reddit: {
    url: string;
    title: string;
  };
  linkedin: {
    url: string;
  };
  email: {
    to: string;
    cc?: string;
    subject: string;
    body: string;
  };
};

export type Target = keyof TargetData;

const ENDPOINTS: Record<Target, string> = {
  facebook: 'https://www.facebook.com/sharer/sharer.php?',
  twitter: 'https://twitter.com/share?',
  reddit: 'http://www.reddit.com/submit?',
  linkedin: 'https://linkedin.com/sharing/share-offsite/?',
  whatsapp: 'https://api.whatsapp.com/send?',
  telegram: 'https://t.me/share/url?',
  email: 'mailto:',
};

export function getShareUrl<T extends Target>(target: T, data: TargetData[T]) {
  let params = _generateUrlParams(data);

  if (target === 'email') {
    const to = (data as any).to;
    delete (data as any).to;
    params = _generateUrlParams(data);
  }

  return ENDPOINTS[target] + _generateUrlParams(data);
}

function _generateUrlParams(data: Record<string, string>) {
  return new URLSearchParams(data).toString();
}
