import { QueryClient } from "@tanstack/react-query";
import { StakeKitContext } from "./query-provider";
import { Context } from "react";

export const customQueryOptions = <T>(
  options: T
): T & {
  context: Context<QueryClient | undefined>;
} => ({ ...options, context: StakeKitContext });
