import { EventEmitter } from 'events';
import {
  formatJsonRpcError,
  IJsonRpcConnection,
  JsonRpcPayload,
  JsonRpcResponse,
} from '@json-rpc-tools/utils';
import { safeJsonParse } from 'safe-json-utils';

export class WebViewConnection implements IJsonRpcConnection {
  public events = new EventEmitter();

  private api: WebViewApi | undefined;

  private registering = false;

  get connected(): boolean {
    return typeof this.api !== 'undefined';
  }

  get connecting(): boolean {
    return this.registering;
  }

  public on(event: string, listener: any): void {
    this.events.on(event, listener);
  }

  public once(event: string, listener: any): void {
    this.events.once(event, listener);
  }

  public off(event: string, listener: any): void {
    this.events.off(event, listener);
  }

  public removeListener(event: string, listener: any): void {
    this.events.removeListener(event, listener);
  }

  public async open(): Promise<void> {
    this.api = await this.register();
  }

  public async close(): Promise<void> {
    this.onClose();
  }

  public async send(payload: JsonRpcPayload): Promise<void> {
    if (typeof this.api === 'undefined') {
      this.api = await this.register();
    }

    this.api
      .send(payload)
      .then((res) => this.onPayload({ data: res }))
      .catch((err) => this.onError(payload.id, err));
  }

  private async register(): Promise<WebViewApi> {
    if (this.registering) {
      return new Promise((resolve, reject) => {
        this.events.once('open', () => {
          if (typeof this.api === 'undefined') {
            return reject(new Error('Connection is missing or invalid'));
          }

          resolve(this.api);
        });
      });
    }

    this.registering = true;
    const api = new WebViewApi();
    this.onOpen(api);

    return api;
  }

  private onOpen(api: WebViewApi) {
    this.api = api;
    this.registering = false;
    this.events.emit('open');
  }

  private onClose() {
    this.events.emit('close');
  }

  private onPayload(e: { data: any }) {
    if (typeof e.data === 'undefined') return;

    const payload: JsonRpcPayload =
      typeof e.data === 'string' ? safeJsonParse(e.data) : e.data;
    this.events.emit('payload', payload);
  }

  private onError(id: number, e: Error) {
    const message = e.message || e.toString();
    const payload = formatJsonRpcError(id, message);
    this.events.emit('payload', payload);
  }
}

class WebViewApi {
  events = new EventEmitter();

  timeoutMs: number;

  constructor(args: { timeoutMs?: number } = {}) {
    this.timeoutMs = args.timeoutMs ?? 1000 * 60 * 5;

    window.addEventListener('message', this.messageSubscription);
  }

  private constructEventName = (id: number) => `webViewMessage:${id}`;

  messageSubscription = (e: MessageEvent) => {
    try {
      const parsedData: JsonRpcResponse = JSON.parse(e.data);
      this.events.emit(this.constructEventName(parsedData.id), parsedData);
    } catch (error) {
      console.log(error);
    }
  };

  public clearSubscriptions() {
    window.removeEventListener('message', this.messageSubscription);
  }

  public async send(payload: JsonRpcPayload) {
    const promise = new Promise((resolve, reject) => {
      // const timeoutId = setTimeout(() => {
      //   reject(new Error("Timeout: No response from WebView"));
      // }, this.timeoutMs);

      this.events.once(
        this.constructEventName(payload.id),
        (data: JsonRpcResponse) => {
          // clearTimeout(timeoutId);
          resolve(data);
        },
      );
    });

    window.ReactNativeWebView?.postMessage(JSON.stringify(payload));

    return promise;
  }
}
