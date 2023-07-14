import useStateMachine, { t } from "@cassiozen/usestatemachine";
import { $$t } from "@cassiozen/usestatemachine/dist/types";
import { useConnect } from "wagmi";
import { InjectedConnector } from "@wagmi/connectors/injected";
import { useSKWallet } from "./use-sk-wallet";
import { isMobile } from "../utils";

const tt = t as <T extends unknown>() => {
  [$$t]: T;
};

export const useWebViewConnectMachine = () => {
  const { isConnected, isConnecting } = useSKWallet();
  const { connectors, connect } = useConnect();

  return useStateMachine({
    schema: { context: tt<{ timeoutId: number | null; retryTimes: number }>() },
    initial:
      isMobile() && !isConnected && !isConnecting ? "connect" : "disabled",
    context: { timeoutId: null, retryTimes: 0 },
    states: {
      disabled: {},
      connect: {
        on: { DONE: "done" },
        effect: ({ send }) => {
          if (isConnected) return send("DONE");

          const injConn = connectors.find(
            (c) => c instanceof InjectedConnector
          );

          if (injConn) {
            connect({ connector: injConn });
          }

          return send("DONE");
        },
      },
      done: {
        on: { CONNECT: "connect" },
        effect: ({ send, context, setContext }) => {
          if (isConnected || context.retryTimes >= 1) return;

          if (context.timeoutId) clearTimeout(context.timeoutId);

          // Retry in 2 seconds
          const newTimeoutId = setTimeout(() => {
            send("CONNECT");
          }, 1000 * 2);

          setContext((prev) => ({
            ...prev,
            retryTimes: prev.retryTimes + 1,
            timeoutId: newTimeoutId as unknown as number,
          }));
        },
      },
    },
  });
};
