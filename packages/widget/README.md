# StakeKit Widget

StakeKit Widget is a component that you can embed in your website with few lines of code. It allows your users to stake their crypto assets and earn rewards.


StakeKit Widget is mainly built as a React component and can be easily added in your application by importing it. There is also an option to use fully bundled widget component which can be added in any javascript library. If your application is already using React, using it as a React component will reduce bundle size of your application. If not, there is option for fully bundled component.

## Development

Create `.env.development.local` file and add variables from `.env.example`. For production builds, add `.env.production.local` file


## Installation

To install StakeKit Widget:

```bash
npm install @stakekit/widget
```
or
```bash
yarn add @stakekit/widget
```
or
```bash
pnpm add @stakekit/widget
```

If you are going to use StakeKit Widget as a React component, you'll need to install some additional peer dependencies:

```bash
npm install wagmi viem
```
or
```bash
yarn add wagmi viem
```
or
```bash
pnpm add wagmi viem
```

## Usage

To use StakeKit Widget, first you'll need API key from StakeKit.

## React component usage

After you get the API key, you can import styles and widget component:

```tsx
  import "@stakekit/widget/package/css";
  import { SKApp, darkTheme } from "@stakekit/widget";

  const App = () => {
    return (
      <SKApp
        apiKey="your-api-key"
        theme={darkTheme}****
        connectKitForceTheme="darkMode"
      />
    )
  }
```

## Bundled component usage

```ts
  import "@stakekit/widget/bundle/css";
  import { renderSKWidget, lightTheme } from "@stakekit/widget/bundle";

  renderSKWidget({
    container: document.getElementById("sk_widget_container")!,
    apiKey: 'your-api-key',
    theme: lightTheme,
    connectKitForceTheme: false,
  });
```

After this is done, you can start using the widget.

## Style customization

You can customize look of widget by overriding `darkTheme` or `lightTheme`, or providing your own theme and passing it to StakeKit. If theme is not provided, widget will use default `lightTheme`.


```tsx
  import "@stakekit/widget/package/css";
  import { SKApp } from "@stakekit/widget";

  const App = () => {
    return (
      <SKApp
        apiKey="your-api-key"
        theme={{
          lightMode: {
            font: { body: '"IBM Plex Mono", monospace' },
            color: {
              primaryButtonBackground: "#8323fd",
              primaryButtonActiveOutline: "#8323fd",
              primaryButtonOutline: "#8323fd",
            },
            borderRadius: { primaryButton: "0", widgetBorderRadius: "10px" },
          },
        }}
        connectKitForceTheme="lightMode"
      />
    )
  }
```

```tsx
  import "@stakekit/widget/package/css";
  import { SKApp, darkTheme } from "@stakekit/widget";

  const App = () => {
    return (
      <SKApp
        apiKey="your-api-key"
        theme={{
          ...darkTheme,
          borderRadius: { ...darkTheme.borderRadius, widgetBorderRadius: "10px" },
        }}
        connectKitForceTheme="darkMode"
      />
    )
  }
```

You can also provide both themes, and widget will respect preference if a user has requested light or dark color themes

```tsx
  import "@stakekit/widget/package/css";
  import { SKApp, darkTheme, lightTheme } from "@stakekit/widget";

  const App = () => {
    return (
      <SKApp
        apiKey="your-api-key"
        theme={{
          lightMode: lightTheme,
          darkMode: darkTheme
        }}
        connectKitForceTheme="darkMode"
      />
    )
  }
```

#### Theme properties:

```ts
{
  {
    borderRadius: {
        2xl: string;
        3xl: string;
        base: string;
        full: string;
        half: string;
        lg: string;
        md: string;
        none: string;
        primaryButton: string;
        secondaryButton: string;
        sm: string;
        widgetBorderRadius: string;
        xl: string;
    };
    color: {
        accent: string;
        background: string;
        backgroundMuted: string;
        black: string;
        disabled: string;
        disabledButtonActiveBackground: string;
        disabledButtonActiveColor: string;
        disabledButtonActiveOutline: string;
        disabledButtonBackground: string;
        disabledButtonColor: string;
        disabledButtonHoverBackground: string;
        disabledButtonHoverColor: string;
        disabledButtonHoverOutline: string;
        disabledButtonOutline: string;
        modalBodyBackground: string;
        modalOverlayBackground: string;
        positionsSectionBackgroundColor: string;
        positionsSectionBorderColor: string;
        positionsSectionDividerColor: string;
        primary: string;
        primaryButtonActiveBackground: string;
        primaryButtonActiveColor: string;
        primaryButtonActiveOutline: string;
        primaryButtonBackground: string;
        primaryButtonColor: string;
        primaryButtonHoverBackground: string;
        primaryButtonHoverColor: string;
        primaryButtonHoverOutline: string;
        primaryButtonOutline: string;
        secondaryButtonActiveBackground: string;
        secondaryButtonActiveColor: string;
        secondaryButtonActiveOutline: string;
        secondaryButtonBackground: string;
        secondaryButtonColor: string;
        secondaryButtonHoverBackground: string;
        secondaryButtonHoverColor: string;
        secondaryButtonHoverOutline: string;
        secondaryButtonOutline: string;
        stakeSectionBackground: string;
        text: string;
        textDanger: string;
        textMuted: string;
        tokenSelect: string;
        tokenSelectBackground: string;
        tokenSelectHoverBackground: string;
        transparent: string;
        white: string;
    };
    font: {
        body: string;
    };
    fontSize: {
        2xl: string;
        3xl: string;
        4xl: string;
        5xl: string;
        6xl: string;
        lg: string;
        lgx: string;
        md: string;
        sm: string;
        xl: string;
        xs: string;
    };
    fontWeight: {
        bold: string;
        extrabold: string;
        medium: string;
        modalHeading: string;
        normal: string;
        primaryButton: string;
        secondaryButton: string;
        semibold: string;
        tokenSelect: string;
    };
    heading: {
        h1: {
            mobile: {
                fontSize: string;
            };
            tablet: {
                fontSize: string;
            };
        };
        h2: {
            mobile: {
                fontSize: string;
            };
            tablet: {
                fontSize: string;
            };
        };
        h3: {
            mobile: {
                fontSize: string;
            };
            tablet: {
                fontSize: string;
            };
        };
        h4: {
            mobile: {
                fontSize: string;
            };
            tablet: {
                fontSize: string;
            };
        };
    };
    letterSpacing: {
        normal: string;
        tight: string;
        tighter: string;
        wide: string;
        wider: string;
        widest: string;
    };
    lineHeight: {
        2xl: string;
        3xl: string;
        4xl: string;
        5xl: string;
        6xl: string;
        base: string;
        lg: string;
        md: string;
        none: string;
        short: string;
        shorter: string;
        sm: string;
        tall: string;
        taller: string;
        xl: string;
        xs: string;
    };
    space: {
        0: string;
        1: string;
        10: string;
        12: string;
        14: string;
        16: string;
        2: string;
        20: string;
        24: string;
        28: string;
        3: string;
        32: string;
        36: string;
        4: string;
        40: string;
        44: string;
        48: string;
        5: string;
        6: string;
        7: string;
        8: string;
        9: string;
        auto: string;
        buttonMinHeight: string;
        full: string;
        px: string;
        unset: string;
    };
    text: {
        small: {
            mobile: {
                fontSize: string;
            };
            tablet: {
                fontSize: string;
            };
        };
        standard: {
            mobile: {
                fontSize: string;
            };
            tablet: {
                fontSize: string;
            };
        };
        xsmall: {
            mobile: {
                fontSize: string;
            };
            tablet: {
                fontSize: string;
            };
        };
    };
    zIndices: {
        auto: string;
        banner: string;
        base: string;
        docked: string;
        dropdown: string;
        hide: string;
        modal: string;
        overlay: string;
        skipLink: string;
        sticky: string;
    };
  }
}
```


## React Native wallets usage

To use StakeKit with your wallets managed provider, you can use utility hook to get prepared props and pass them to `WebView` component from `react-native-webview`. Using widget with injected provider skips connection step.

First, install package:


```bash
npm install @steakwallet/use-inject-provider
```
or
```bash
yarn add @steakwallet/use-inject-provider
```
or
```bash
pnpm add @steakwallet/use-inject-provider
```

After that, pass wallets managed EIP-1193 provider and web-views ref to `useInjectProvider`, and you'll receive  `injectedJavaScript` and `onMessage` props that you need to pass to `WebView` component.

Example:
```tsx
import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { useInjectProvider } from '@steakwallet/use-inject-provider';

// Some EIP1193Provider thats managed by wallet
class Provider {
  async request(args) {
    switch (args.method) {
      case 'eth_accounts':
      case 'eth_requestAccounts': {
        // get accounts from your wallet
        // ...
        return ['0xe455036e2f3a26df7014b7dbf6cedbbf81433478']
      }

      case 'eth_chainId': {
        // get current chain id
        return  '1';
      }

      case "eth_sendTransaction": {
        // send transaction and return transaction hash
        // ...
        return "some_transaction_hash";
      }

      default:
        throw new Error('unhandled method');
    }
  }
}

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
      source={{ uri: `${WIDGET_URL}/?api_key=${YOUR_API_KEY}` }}
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
