import type { CreateWebhookSubscriptionDtoEvent } from './createWebhookSubscriptionDtoEvent';

export interface CreateWebhookSubscriptionDto {
  callback: string;
  events: CreateWebhookSubscriptionDtoEvent[];
}
