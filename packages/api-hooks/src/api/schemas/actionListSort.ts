export type ActionListSort =
  (typeof ActionListSort)[keyof typeof ActionListSort];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ActionListSort = {
  createdAtAsc: 'createdAtAsc',
  createdAtDesc: 'createdAtDesc',
} as const;
