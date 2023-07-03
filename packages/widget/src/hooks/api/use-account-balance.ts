import { EitherAsync, Maybe } from "purify-ts";
import {
  BalancesRequestDto,
  BalanceResponseDto,
  tokenGetTokenBalances,
  getTokenGetTokenBalancesQueryKey,
} from "@stakekit/api-hooks";
import { State } from "../../state/types";
import { useSKWallet } from "../use-sk-wallet";
import { useQuery } from "@tanstack/react-query";

export const useAccountBalance = ({
  selectedStake,
}: {
  selectedStake: State["selectedStake"];
}) => {
  const { address, additionalAddresses } = useSKWallet();

  const balancesRequestDto = selectedStake
    .map((y) => ({
      network: y.token.network,
      tokenAddress: y.token.address,
    }))
    .chain((d) =>
      Maybe.fromNullable(address).map((a) => ({ ...d, address: a }))
    )
    .map<{ dto: BalancesRequestDto; enabled: boolean }>((n) => ({
      enabled: true,
      dto: {
        addresses: [
          {
            address: n.address,
            network: n.network,
            tokenAddress: n.tokenAddress,
            additionalAddresses: additionalAddresses ?? undefined,
          },
        ],
      },
    }))
    .extractNullable() ?? {
    dto: {
      addresses: [
        {
          address: "",
          network: "ethereum",
          tokenAddress: "",
        },
      ],
    },
    enabled: false,
  };

  return useQuery<BalanceResponseDto[], Error>(
    getTokenGetTokenBalancesQueryKey(balancesRequestDto.dto),
    async () => {
      const result = await EitherAsync(() =>
        tokenGetTokenBalances(balancesRequestDto.dto)
      ).mapLeft(() => new Error("Stake enter error"));

      return result.caseOf({
        Left: (e) => Promise.reject(e),
        Right: (r) => Promise.resolve(r),
      });
    },
    { enabled: balancesRequestDto.enabled }
  );
};
