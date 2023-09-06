import type { WebhookSubscriptionEventDto } from './webhookSubscriptionEventDto';

export interface WebhookSubscriptionDto {
  id: string;
  callback: string;
  events: WebhookSubscriptionEventDto[];
}
