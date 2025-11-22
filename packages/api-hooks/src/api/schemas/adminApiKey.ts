export interface AdminApiKey {
  apiKey: string;
  createdAt: string;
  deletedAt: string | null;
  id: string;
  info: string | null;
  lastUsedAt: string | null;
  name: string;
  updatedAt: string;
}
