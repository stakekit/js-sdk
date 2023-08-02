## React hook for injecting a provider into a react-native-webview

Utility hook for injecting EIP-1193 provider in react-native-webview

```bash
npm install @stakekit/use-inject-provider
```

or

```bash
yarn add @stakekit/use-inject-provider
```

or

```bash
pnpm add @stakekit/use-inject-provider
```

Example:

```ts
import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { useInjectProvider } from '@stakekit/use-inject-provider';

// Some EIP1193Provider thats managed by wallet
const provider = new Provider();

export const WebViewStake = () => {
  const webViewRef = useRef<WebView>(null);

  const { injectedJavaScript, onMessage } = useInjectProvider({
    webViewRef,
    provider,
  });

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: 'https://stakek.it' }}
      onMessage={onMessage}
      injectedJavaScript={injectedJavaScript}
      style={styles.container}
      cacheEnabled={false}
    />
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
```
