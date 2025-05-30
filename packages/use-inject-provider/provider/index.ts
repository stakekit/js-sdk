import { WebViewConnection } from './webview-connection';
import { EthereumProvider } from 'eip1193-provider';

if (window.ReactNativeWebView) {
  window.ethereum = new EthereumProvider(new WebViewConnection());
}
