import { DerivedAppState } from "../../../state";
import { Box } from "../../atoms/box";
import { Divider } from "../../atoms/divider";
import { Text } from "../../atoms/typography";
import { Trans } from "react-i18next";
import { inlineText } from "./style.css";
import { Image } from "../../atoms/image";

export const RewardTokenDetails = ({
  rewardToken,
}: {
  rewardToken: DerivedAppState["rewardToken"];
}) => {
  return rewardToken
    .map((rt) => (
      <>
        <Box display="flex" alignItems="center" my="4">
          {rt.logoUri && (
            <Image hw="5" src={rt.logoUri} marginRight="1" fallback />
          )}

          <Text variant={{ size: "xsmall", weight: "bold" }}>
            <Trans
              i18nKey="details.reward_token"
              values={{
                symbol: rt.symbol,
                providerName: rt.providerName,
              }}
              components={{
                highlight0: (
                  <Text
                    as="span"
                    className={inlineText}
                    variant={{ type: "muted", size: "xsmall" }}
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
