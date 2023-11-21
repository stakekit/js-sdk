import type { WebhookSubscriptionEventDto } from './webhookSubscriptionEventDto';

export interface WebhookSubscriptionDto {
  callback: string;
  events: WebhookSubscriptionEventDto[];
  id: string;
}
