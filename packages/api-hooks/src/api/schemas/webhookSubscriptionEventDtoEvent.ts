export type WebhookSubscriptionEventDtoEvent =
  (typeof WebhookSubscriptionEventDtoEvent)[keyof typeof WebhookSubscriptionEventDtoEvent];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const WebhookSubscriptionEventDtoEvent = {
  '*': '*',
  maintenance: 'maintenance',
  'proxy-contract-upgrade': 'proxy-contract-upgrade',
  'opportunity-deprecation': 'opportunity-deprecation',
  'opportunity-pause': 'opportunity-pause',
  'opportunity-resume': 'opportunity-resume',
  failure: 'failure',
  success: 'success',
  'claim-rewards': 'claim-rewards',
  'waiting-for-next': 'waiting-for-next',
  'withdraw-funds': 'withdraw-funds',
} as const;
