import { useMemo } from "react";
import { usePositionData } from "./use-position-data";
import { List } from "purify-ts";

export const useStakedOrLiquidBalance = (
  position: ReturnType<typeof usePositionData>["position"]
) => {
  return useMemo(
    () =>
      position.chain((p) =>
        List.find(
          (b) => b.type === "staked" || b.type === "available",
          p.balanceData.balances
        )
      ),
    [position]
  );
};
