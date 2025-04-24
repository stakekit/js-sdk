export type ReportProjectListSort =
  (typeof ReportProjectListSort)[keyof typeof ReportProjectListSort];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ReportProjectListSort = {
  createdAtAsc: 'createdAtAsc',
  createdAtDesc: 'createdAtDesc',
} as const;
