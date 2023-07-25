import { useMemo } from "react";
import { usePositionsData } from "./use-positions-data";
import { Maybe } from "purify-ts";

export const usePositionData = (id?: string) => {
  const { positionsData, isLoading } = usePositionsData();

  const val = useMemo(
    () =>
      Maybe.fromNullable(id).chain((id) =>
        Maybe.fromNullable(positionsData.get(id))
      ),
    [id, positionsData]
  );

  return { position: val, isLoading };
};
