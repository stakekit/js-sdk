export type YieldProviders =
  (typeof YieldProviders)[keyof typeof YieldProviders];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const YieldProviders = {
  aave: 'aave',
  anchor: 'anchor',
  benqi: 'benqi',
  compound: 'compound',
  lido: 'lido',
  sushi: 'sushi',
  yearn: 'yearn',
  ape: 'ape',
  chainlink: 'chainlink',
  pendle: 'pendle',
  paraspace: 'paraspace',
  'rocket-pool': 'rocket-pool',
  stakewise: 'stakewise',
  'morpho-aave': 'morpho-aave',
  'morpho-compound': 'morpho-compound',
} as const;
