export interface Project {
  id: string;
  createdAt: string;
  updatedAt: string;
  autoComplaintBansEnabled: boolean;
  deletedAt: string | null;
  description: string | null;
  name: string;
  teamId: string;
}
