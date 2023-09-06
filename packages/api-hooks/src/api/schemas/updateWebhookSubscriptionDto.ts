import type { UpdateWebhookSubscriptionDtoEvent } from './updateWebhookSubscriptionDtoEvent';

export interface UpdateWebhookSubscriptionDto {
  callback?: string;
  events: UpdateWebhookSubscriptionDtoEvent[];
}
