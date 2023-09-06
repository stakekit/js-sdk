import type { WebhookSubscriptionEventDtoEvent } from './webhookSubscriptionEventDtoEvent';

export interface WebhookSubscriptionEventDto {
  category: string;
  event: WebhookSubscriptionEventDtoEvent;
}
