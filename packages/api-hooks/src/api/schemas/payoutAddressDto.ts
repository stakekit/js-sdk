export interface PayoutAddressDto {
  address: string;
  id: string;
  lastPayout: string | null;
  network: string;
  projectId: string;
}
