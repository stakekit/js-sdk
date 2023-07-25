import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStepsMachine } from "./use-steps-machine";
import { StakeDto } from "@stakekit/api-hooks";
import { Maybe } from "purify-ts";

export const useSteps = (session: Maybe<StakeDto>) => {
  const navigate = useNavigate();

  const [machine, send] = useStepsMachine();

  const id = session.map((val) => val.id).extractNullable();

  /**
   * Start sign + check tx on mount
   */
  useEffect(() => {
    if (!id) return;

    send({ type: "START", id });
  }, [id, send]);

  /**
   * Clear timeout on unmount
   */
  useEffect(() => {
    return () => {
      const timeoutId = machine.context.txCheckTimeoutId;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [machine.context.txCheckTimeoutId]);

  useEffect(() => {
    if (machine.value === "done") {
      navigate("../complete", {
        state: { urls: machine.context.urls },
        relative: "path",
      });
    }
  }, [machine.context.urls, machine.value, navigate]);

  const onClick = () => navigate(-1);

  const state = {
    sign: {
      isSuccess:
        machine.value !== "idle" &&
        machine.value !== "signLoading" &&
        machine.value !== "signError",
      isLoading: machine.value === "signLoading",
      isError: machine.value === "signError",
      retry: () => {
        if (machine.value === "signLoading" || !id) return;

        send({ type: "SIGN_RETRY", id });
      },
    },
    checkTxStatus: {
      isSuccess: machine.value === "done",
      isLoading:
        machine.value === "txCheckLoading" || machine.value === "txCheckRetry",
      isError: machine.value === "txCheckError",
      retry: () => {
        if (machine.value === "txCheckLoading" || !id) return;

        send({ type: "TX_CHECK_RETRY", id });
      },
    },
  };

  return {
    state,
    onClick,
  };
};
