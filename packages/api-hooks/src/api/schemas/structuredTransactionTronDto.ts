import type { StructuredTransactionTronDtoVotesItem } from './structuredTransactionTronDtoVotesItem';

export interface StructuredTransactionTronDto {
  balance?: number;
  frozen_balance?: number;
  lock?: boolean;
  lock_period?: number;
  owner_address: string;
  receiver_address?: string;
  resource?: string;
  unfreeze_balance?: number;
  votes?: StructuredTransactionTronDtoVotesItem[];
}
