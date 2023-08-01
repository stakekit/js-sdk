import {
  GasModeValueDto,
  PendingActionRequestDto,
  StakeDto,
  TransactionDto,
  stakePendingActions,
  transactionConstruct,
} from "@stakekit/api-hooks";
import { EitherAsync } from "purify-ts";
import { useSharedMutation } from "../use-shared-mutation";
import { getValidStakeSessionTx } from "../../domain";

export const usePendingActionAndTxsConstruct = () => {
  return useSharedMutation<
    { pendingActionRes: StakeDto; transactionConstructRes: TransactionDto[] },
    Error,
    {
      pendingActionRequestDto: PendingActionRequestDto;
      gasModeValue: GasModeValueDto | undefined;
    }
  >(["pending-action"], async ({ pendingActionRequestDto, gasModeValue }) => {
    const result = await EitherAsync(() =>
      stakePendingActions(pendingActionRequestDto)
    )
      .mapLeft(() => new Error("Pending action request error"))
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
          pendingActionRes: val,
          transactionConstructRes: res,
        }))
      );

    return result.caseOf({
      Left: (e) => Promise.reject(e),
      Right: (r) => Promise.resolve(r),
    });
  });
};
