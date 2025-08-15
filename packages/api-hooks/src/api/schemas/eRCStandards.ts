export type ERCStandards = (typeof ERCStandards)[keyof typeof ERCStandards];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ERCStandards = {
  ERC20: 'ERC20',
  ERC4626: 'ERC4626',
  ERC721: 'ERC721',
  ERC1155: 'ERC1155',
} as const;
