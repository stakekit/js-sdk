import { useStakeYieldOpportunities } from "@stakekit/api-hooks";

export const useOpportunities: typeof useStakeYieldOpportunities = (
  ...args
) => {
  return useStakeYieldOpportunities(...args);
};
