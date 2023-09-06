export interface Key {
  id: string;
  createdAt: string;
  updatedAt: string;
  apiKey: string;
  deletedAt: string | null;
  info: string;
  category: string;
  name: string;
  lastUsedAt: string | null;
  projectId: string;
}
