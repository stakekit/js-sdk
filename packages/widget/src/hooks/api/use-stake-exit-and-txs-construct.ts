import {
  GasModeValueDto,
  StakeDto,
  StakeRequestDto,
  TransactionDto,
  stakeExit,
  transactionConstruct,
} from "@stakekit/api-hooks";
import { EitherAsync } from "purify-ts";
import { useSharedMutation } from "../use-shared-mutation";
import { getValidStakeSessionTx } from "../../domain";

export const useStakeExitAndTxsConstruct = () => {
  return useSharedMutation<
    { stakeExitRes: StakeDto; transactionConstructRes: TransactionDto[] },
    Error,
    {
      stakeRequestDto: StakeRequestDto;
      gasModeValue: GasModeValueDto | undefined;
    }
  >(["stake-exit"], async ({ stakeRequestDto, gasModeValue }) => {
    const result = await EitherAsync(() => stakeExit(stakeRequestDto))
      .mapLeft(() => new Error("Stake exit error"))
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
          stakeExitRes: val,
          transactionConstructRes: res,
        }))
      );

    return result.caseOf({
      Left: (e) => Promise.reject(e),
      Right: (r) => Promise.resolve(r),
    });
  });
};
