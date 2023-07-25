import { DerivedAppState } from "../../../state";
import { Box } from "../../atoms/box";
import { Divider } from "../../atoms/divider";
import { Text } from "../../atoms/typography";
import { Trans } from "react-i18next";
import { inlineText } from "./style.css";
import { Image } from "../../atoms/image";

export const RewardTokenDetails = ({
  rewardToken,
  type = "stake",
}: {
  rewardToken: DerivedAppState["rewardToken"];
  type?: "stake" | "unstake" | "claim";
}) => {
  return rewardToken
    .map((rt) => (
      <>
        <Box display="flex" alignItems="center" my="4">
          {rt.logoUri && <Image hw="5" src={rt.logoUri} marginRight="1" />}

          <Text variant={{ size: "small", weight: "semibold" }}>
            <Trans
              i18nKey={
                type === "stake"
                  ? "details.reward_token"
                  : type === "claim"
                  ? "claim_review.claim_from"
                  : "unstake_review.unstake_from"
              }
              values={{
                symbol: rt.symbol,
                providerName: rt.providerName,
              }}
              components={{
                highlight0: (
                  <Text
                    as="span"
                    className={inlineText}
                    variant={{ type: "muted", size: "small", weight: "medium" }}
                  />
                ),
              }}
            />
          </Text>
        </Box>

        <Divider />
      </>
    ))
    .extractNullable();
};
