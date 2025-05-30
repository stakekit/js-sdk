import {
  formatJsonRpcError,
  formatJsonRpcResult,
  isJsonRpcRequest,
} from '@json-rpc-tools/utils';
import { EIP1193Provider } from 'eip1193-provider';
import { RefObject, useCallback, useMemo } from 'react';
import WebView, { WebViewProps } from 'react-native-webview';
// @ts-expect-error
import generatedProvider from 'inline:../provider/generated-provider.js';

export const useInjectProvider = (args: {
  provider: EIP1193Provider;
  webViewRef: RefObject<WebView>;
}) => {
  const { provider, webViewRef } = args;

  const injectedJavaScript: NonNullable<WebViewProps['injectedJavaScript']> =
    generatedProvider;

  const onMessage = useCallback<NonNullable<WebViewProps['onMessage']>>(
    async ({ nativeEvent: { data } }) => {
      try {
        if (!webViewRef.current) {
          return console.warn('webViewRef.current is missing');
        }

        const parsedData = JSON.parse(data);

        if (!isJsonRpcRequest(parsedData)) {
          return webViewRef.current.postMessage(
            JSON.stringify(
              formatJsonRpcError(parsedData.id, 'Invalid request'),
            ),
          );
        }

        const result = await provider
          .request({
            method: parsedData.method,
            params: parsedData.params,
          })
          .then((result) => formatJsonRpcResult(parsedData.id, result))
          .catch((e) => formatJsonRpcError(e));

        return webViewRef.current.postMessage(JSON.stringify(result));
      } catch (error) {
        console.log(error);
      }
    },
    [provider, webViewRef],
  );

  return useMemo(() => {
    return {
      injectedJavaScript,
      onMessage,
    };
  }, [injectedJavaScript, onMessage]);
};
