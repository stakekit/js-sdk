import { usePositionsData } from "../../../../hooks/use-positions-data";
import { createSelector } from "reselect";

export const usePositions = () => {
  const { positionsData, isLoading } = usePositionsData();

  const tableData = positionsDataSelector(positionsData);

  return {
    isLoading,
    tableData,
  };
};

const positionsDataSelector = createSelector(
  (data: ReturnType<typeof usePositionsData>["positionsData"]) => data,
  (data) => [...data.values()].filter((p) => p.balanceData.type !== "available")
);
