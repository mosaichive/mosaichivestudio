import { SiteSettingsRow } from '@/hooks/useStudioContent';

export type ProofItem = {
  stat: string;
  label: string;
  body: string;
};

export const DEFAULT_STUDIO_CAPABILITIES = [
  'Identity systems',
  'Websites',
  'Campaigns',
  'Motion',
  'Content',
  'Product interfaces',
];

export const getDefaultProofItems = (settings?: Partial<SiteSettingsRow> | null): ProofItem[] => [
  {
    stat: `${settings?.counter_years ?? 10}+`,
    label: 'Years in practice',
    body: 'A decade shipping work for founders, cultural brands and mission-led businesses across Africa and beyond.',
  },
  {
    stat: `${settings?.counter_projects ?? 240}+`,
    label: 'Projects shipped',
    body: 'Identities, websites, campaigns and product interfaces — built end-to-end under one creative roof.',
  },
  {
    stat: `${settings?.counter_brands ?? 32}`,
    label: 'Brands trusted us',
    body: 'From early-stage ventures to established institutions — partners who came back for the next chapter.',
  },
];

export const asTextList = (value: unknown, fallback: string[]) => {
  if (!Array.isArray(value)) return fallback;

  const list = value
    .map((item) => String(item ?? '').trim())
    .filter(Boolean);

  return list.length > 0 ? list : fallback;
};

export const asProofItems = (value: unknown, fallback: ProofItem[]) => {
  if (!Array.isArray(value)) return fallback;

  const list = value
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      const proof = item as Partial<ProofItem>;
      return {
        stat: String(proof.stat ?? '').trim(),
        label: String(proof.label ?? '').trim(),
        body: String(proof.body ?? '').trim(),
      };
    })
    .filter((item): item is ProofItem => !!item && !!item.stat && !!item.label && !!item.body);

  return list.length > 0 ? list : fallback;
};
