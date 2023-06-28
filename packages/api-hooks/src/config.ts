export const config = {
  queryClient: {
    staleTime: 1000 * 30,
    cacheTime: 1000 * 30,
  },
} as const;
