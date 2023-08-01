export const config = {
  appName: "SteakKit",
  currency: "USD",
  apiUrl: import.meta.env.VITE_API_URL,
  apiKey: import.meta.env.VITE_API_KEY,
  queryClient: {
    staleTime: 1000 * 5,
    cacheTime: 1000 * 30,
  },
  gasEstimatePercentFix: 20,
  isTestMode: import.meta.env.MODE === "test",
  walletConnectV2: {
    relayUrl: "wss://relay.walletconnect.com",
    projectId: "10a5257c04d1d3097ff768a139c95f50",
  },
} as const;
