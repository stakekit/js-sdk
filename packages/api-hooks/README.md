## React hooks for StakeKit API

Utility hooks for interacting with StakeKit API


```bash
npm install @stakekit/api-hooks
```
or
```bash
yarn add @stakekit/api-hooks
```
or
```bash
pnpm add @stakekit/api-hooks
```

Configure API client with proper base url, API key and wrap app with StakeKitQueryProvider:

Example:
```tsx
import { APIManager, StakeKitQueryProvider, useStakeKitQueryClient } from '@stakekit/api-hooks';

APIManager.configure({
  apiKey: "<your-api-key-here>",
  baseURL: "<your-base-url-here>",
  queryClientConfig: { // optional
    defaultOptions: {
      queries: { cacheTime: 1000 * 30, staleTime: 1000 * 30 },
    },
  }
})

// APIManager.queryClient.clear()

const App = () => {
  const queryClient = useStakeKitQueryClient()

  const logout = () => queryClient.clear()

  return (
    <StakeKitQueryProvider>
      <Main />
      <button onClick={logout} />
    </StakeKitQueryProvider>
  )
}
```

After configuration part, hooks can be used
