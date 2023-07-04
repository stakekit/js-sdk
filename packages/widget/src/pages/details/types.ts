import { YieldOpportunityDto } from "@stakekit/api-hooks";
import { yieldTypesMap } from "../../domain/types";

export type SelectedStakeData = {
  [Key in keyof typeof yieldTypesMap]: {
    type: Key;
    title: (typeof yieldTypesMap)[Key]["title"];
    items: YieldOpportunityDto[];
  };
};
