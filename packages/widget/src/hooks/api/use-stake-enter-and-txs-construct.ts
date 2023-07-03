import {
  GasModeValueDto,
  StakeDto,
  StakeRequestDto,
  TransactionDto,
  stakeEnter,
  transactionConstruct,
} from "@stakekit/api-hooks";
import { EitherAsync } from "purify-ts";
import { useSharedMutation } from "../use-shared-mutation";
import { getValidStakeSessionTx } from "../../domain";

export const useStakeEnterAndTxsConstruct = () => {
  return useSharedMutation<
    { stakeEnterRes: StakeDto; transactionConstructRes: TransactionDto[] },
    Error,
    {
      stakeRequestDto: StakeRequestDto;
      gasModeValue: GasModeValueDto | undefined;
    }
  >(["stake-enter"], async ({ stakeRequestDto, gasModeValue }) => {
    const result = await EitherAsync(() => stakeEnter(stakeRequestDto))
      .mapLeft(() => new Error("Stake enter error"))
      .chain((val) => EitherAsync.liftEither(getValidStakeSessionTx(val)))
      .chain((val) =>
        EitherAsync.sequence(
          val.transactions.map((tx) =>
            EitherAsync(() =>
              transactionConstruct(tx.id, {
                gasArgs: gasModeValue?.gasArgs,
              })
            ).mapLeft(() => new Error("Transaction construct error"))
          )
        ).map((res) => ({
          stakeEnterRes: val,
          transactionConstructRes: res,
        }))
      );

    return result.caseOf({
      Left: (e) => Promise.reject(e),
      Right: (r) => Promise.resolve(r),
    });
  });
};
