import useStateMachine, { t } from "@cassiozen/usestatemachine";
import { $$t } from "@cassiozen/usestatemachine/dist/types";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "@wagmi/connectors/injected";
import { isRNWebViewContext } from "../utils";

const tt = t as <T extends unknown>() => {
  [$$t]: T;
};

export const useWebViewConnectMachine = () => {
  const { isConnected } = useAccount();
  const { connectors, connect } = useConnect();

  return useStateMachine({
    schema: { context: tt<{ timeoutId: number | null }>() },
    initial: "connect",
    context: { timeoutId: null },
    states: {
      connect: {
        on: { DONE: "done" },
        effect: ({ send }) => {
          const injConn = connectors.find(
            (c) => c instanceof InjectedConnector
          );

          if (injConn && isRNWebViewContext()) {
            connect({ connector: injConn });
          }

          return send("DONE");
        },
      },
      done: {
        on: { CONNECT: "connect" },
        effect: ({ send, context, setContext }) => {
          if (isConnected || !isRNWebViewContext()) return;

          if (context.timeoutId) clearTimeout(context.timeoutId);

          // Retry in 30 seconds
          const newTimeoutId = setTimeout(() => {
            send("CONNECT");
          }, 1000 * 30);

          setContext((prev) => ({
            ...prev,
            timeoutId: newTimeoutId as unknown as number,
          }));
        },
      },
    },
  });
};
